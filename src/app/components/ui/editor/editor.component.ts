import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Tag } from 'src/app/features/user/create-post/create-post.component';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css'],
})
export class EditorComponent {
  editorContent: any;
  editorInit: any;
  title: string = '';
  tags: { display: string; value: string }[] = [];

  @Input() showSpan: boolean = true;
  @Input() showTitle: boolean = true;
  @Input() showBody: boolean = true;
  @Input() showTag: boolean = true;
  @Input() existingTags!: { display: string; value: string }[];
  @Input() heading: string = '';
  @Input() firstButtonName: string = '';
  @Input() secondButtonName: string = '';
  @Output() onFirstButtonClick: EventEmitter<{
    title: string;
    editorContent: string;
    tags: { display: string; value: string }[];
  }> = new EventEmitter<{
    title: string;
    editorContent: string;
    tags: { display: string; value: string }[];
  }>();

  @Output() onFirstButtonClickReply: EventEmitter<{
    editorContent: string;
  }> = new EventEmitter<{
    editorContent: string;
  }>();
  @Output() onSecondButtonClick: EventEmitter<void> = new EventEmitter<void>();

  constructor() {}

  ngOnInit() {
    this.editorInit = {
      // Initialize the configuration object for TinyMCE editor
      id: 'discussit',
      base_url: '/tinymce',
      suffix: '.min',
      plugins: 'lists link image table code help wordcount', // List of plugins to include in the editor
      placeholder: 'Type your content here...',
      promotion: false,
      branding: false,
      file_picker_callback: (callback: any, value: any, meta: any) => {
        //to attach images directly from system
        const input = document.createElement('input'); // Create a new input element of type 'file'
        input.setAttribute('type', 'file'); // Set the type attribute of the input element to 'file'
        input.setAttribute('accept', 'image/*'); // Set the accept attribute to allow only image files

        input.onchange = () => {
          // Attach an onchange event handler to the input element
          const file = (input.files as FileList)[0]; // Retrieve the selected file from the input element
          const reader = new FileReader(); // Create a new FileReader to read the file content

          reader.onload = () => {
            // Set up a callback for when the FileReader has loaded the file content
            const base64 = reader.result as string; // Convert the file content to base64 encoding
            callback(base64, { alt: file.name }); // Call the TinyMCE callback with the base64-encoded data and file metadata
          };
          // Read the file content as a data URL
          reader.readAsDataURL(file);
        };
        // Programmatically trigger a click event on the input element to open the file picker dialog
        input.click();
      },
      setup: (editor: {
        on: (arg0: string, arg1: () => void) => void;
        getContent: () => any;
      }) => {
        // The editor parameter is an object with two properties: 'on' and 'getContent'.
        // 'on' is a method to attach an event listener to the editor.
        // It takes an event name (arg0: string) and a callback function (arg1: () => void).
        // In this case, it's listening for the 'change' event and updating 'editorContent'.

        editor.on('change', () => {
          // Event listener for the 'change' event in the editor
          this.editorContent = editor.getContent();
          // Update the component's 'editorContent' property with the current content of the editor
        });
      },
    };
  }

  FirstButton() {
    if (!this.showTitle && !this.showTag) {
      if (!this.validContent()) {
        this.isContentValid = false;
        this.contentErrorMessage = `Content must have minimum of ${this.minContentLength} characters.`;
      } else {
        this.isContentValid = true;
        this.contentErrorMessage = '';
        this.onFirstButtonClickReply.emit({
          editorContent: this.editorContent,
        });
      }
    } else {
      this.titleTouched = true;
      const tagsvalidaterarray = this.validateTags();
      if (
        !this.validateTitle() ||
        !tagsvalidaterarray.includes(0) ||
        !this.validContent()
      ) {
        if (!this.validateTitle()) {
          this.isTitleValid = false;
          this.titleErrorMessage = `Title must be between ${this.minTitleLength} and ${this.maxTitleLength} characters.`;
        }
        if (!tagsvalidaterarray.includes(0)) {
          this.isTagValid = false;
          this.tagErrorMessage =
            'Tags field should not be empty, each tag should not special characters or white spaces, and each tag length should be greater than 1.';
        }
        if (!this.validContent()) {
          this.isContentValid = false;
          this.contentErrorMessage = `Content must be between ${this.minContentLength} and ${this.maxContentLength} characters.`;
        }
      } else {
        this.isContentValid = true;
        this.contentErrorMessage = '';
        this.isTitleValid = true;
        this.titleErrorMessage = '';
        this.isTagValid = true;
        this.tagErrorMessage = '';
        this.onFirstButtonClick.emit({
          title: this.title,
          editorContent: this.editorContent,
          tags: this.tags,
        });
      }
    }
  }

  SecondButton() {
    this.onSecondButtonClick.emit();
  }

  onInputChange(event: any) {
    this.title = (event as string).trim();
  }

  // validations
  isTitleValid: boolean = false;
  titleErrorMessage: string = '';
  minTitleLength: number = 5;
  maxTitleLength: number = 100;
  titleTouched: boolean = false;

  isTagValid: boolean = false;
  tagErrorMessage: string = '';
  minTagCount: number = 1;

  isContentValid: boolean = false;
  contentErrorMessage: string = '';
  minContentLength: number = 20;
  maxContentLength: number = 10000;

  public validateTitle(): boolean {
    if (
      this.title.length < this.minTitleLength ||
      this.title.length > this.maxTitleLength
    ) {
      this.isTitleValid = false;
      this.titleErrorMessage = `Title must be between ${this.minTitleLength} and ${this.maxTitleLength} characters.`;
      return false;
    } else {
      this.isTitleValid = true;
      this.titleErrorMessage = '';
      return true;
    }
  }

  public validContent(): boolean {
    if (this.editorContent) {
      if (
        this.editorContent.length < this.minContentLength ||
        this.editorContent.length > this.maxContentLength
      ) {
        return false;
      } else {
        this.isContentValid = true;
        this.contentErrorMessage = '';
        return true;
      }
    }
    return false;
  }

  private validateTags(): number[] {
    var tagvalidatorarray = [];

    if (this.tags.length < this.minTagCount) {
      tagvalidatorarray.push(1);
    }

    const whitespaceRegex = /\s/;
    const specialRegex = /[^\p{L}\p{N}\p{Z}\s]/u;
    const seenTags = new Set<string>();

    for (const tag of this.tags) {
      if (
        tag.value.length <= 1 ||
        whitespaceRegex.test(tag.value) ||
        specialRegex.test(tag.value)
      ) {
        tagvalidatorarray.push(2);
        break;
      }
      if (!seenTags.add(tag.value)) {
        tagvalidatorarray.push(3);
        break;
      }
    }

    return tagvalidatorarray.length === 0 ? [0] : tagvalidatorarray;
  }
}
