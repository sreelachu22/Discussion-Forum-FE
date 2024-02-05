import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent {

  editorContent: any;
  editorInit: any;
  
  @Input() heading: string = '';
  @Input() firstButtonName: string = '';
  @Input() secondButtonName: string = '';
  @Output() onFirstButtonClick: EventEmitter<any> = new EventEmitter<any>();
  @Output() onSecondButtonClick: EventEmitter<void> = new EventEmitter<void>();
  // @Input() onFirstButtonClick: () => void = () => {};
  // @Input() onSecondButtonClick: () => void = () => {};

  constructor() {}

  ngOnInit() {
    this.editorInit = { // Initialize the configuration object for TinyMCE editor
    id: 'discussit',
    base_url: '/tinymce',
    suffix: '.min',
    plugins: 'lists link image table code help wordcount', // List of plugins to include in the editor
    placeholder: 'Type your content here...',
    file_picker_callback: (callback: any, value: any, meta: any) => {  //to attach images directly from system
      const input = document.createElement('input'); // Create a new input element of type 'file'
      input.setAttribute('type', 'file'); // Set the type attribute of the input element to 'file'
      input.setAttribute('accept', 'image/*'); // Set the accept attribute to allow only image files
  
      input.onchange = () => { // Attach an onchange event handler to the input element
        const file = (input.files as FileList)[0]; // Retrieve the selected file from the input element
        const reader = new FileReader(); // Create a new FileReader to read the file content
  
        reader.onload = () => {// Set up a callback for when the FileReader has loaded the file content
          const base64 = reader.result as string;  // Convert the file content to base64 encoding
          callback(base64, { alt: file.name });  // Call the TinyMCE callback with the base64-encoded data and file metadata
        };
        // Read the file content as a data URL
        reader.readAsDataURL(file);
      };
      // Programmatically trigger a click event on the input element to open the file picker dialog
      input.click();
    },
    setup: (editor: { on: (arg0: string, arg1: () => void) => void; getContent: () => any; }) => {
    // The editor parameter is an object with two properties: 'on' and 'getContent'.
    // 'on' is a method to attach an event listener to the editor.
    // It takes an event name (arg0: string) and a callback function (arg1: () => void).
    // In this case, it's listening for the 'change' event and updating 'editorContent'.
  
      editor.on('change', () => { // Event listener for the 'change' event in the editor
        this.editorContent = editor.getContent(); // Update the component's 'editorContent' property with the current content of the editor
      });
    }
  };
}

  FirstButton() {
    this.onFirstButtonClick.emit(this.editorContent);
  }

  SecondButton() {
    this.onSecondButtonClick.emit();
  }
}
