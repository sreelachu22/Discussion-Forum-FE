import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { SuccessPopupComponent } from 'src/app/components/ui/success-popup/success-popup.component';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css'],
})
export class CreatePostComponent {
  // bsModalRef!: BsModalRef;
  editorContent: any;
  // editorInit: any;
  bsModalRef!: BsModalRef;
  communityCategoryMappingID!: number;

  // @Input() heading: string = '';
  // @Input() firstButtonName: string = '';
  // @Input() secondButtonName: string = '';
  // @Input() onFirstButtonClick: () => void = () => {};
  // @Input() onSecondButtonClick: () => void = () => {};

  constructor(
    private route: ActivatedRoute,
    private modalService: BsModalService,
    private http: HttpClient,
    private router: Router
  ) {}

  breadcrumbs = [
    { label: 'Home', route: '/home' },
    { label: 'Community', route: '/community' },
    { label: 'Category', route: '/community/category-posts/:categoryID' },
    { label: 'Create Post', route: '/category-posts/create-posts' },
  ];

  // const queryParams : Params = this.route.snapshot.queryParams;

  // Retrieve data from queryParams and use it in your component
  // this.heading = queryParams['heading'];
  // this.firstButtonName = queryParams['firstButtonName'];
  // this.secondButtonName = queryParams['secondButtonName'];
  // this.onFirstButtonClick = queryParams['onFirstButtonClick'];
  // this.onFirstButtonClick = queryParams['onFirstButtonClick'] || (() => {});
  // this.onSecondButtonClick = queryParams.onSecondButtonClick || (() => {});
  // // Add other data as needed

  // this.route.queryParams.subscribe((queryParams: Params) => {
  //   this.heading = queryParams['heading'];
  //   this.firstButtonName = queryParams['firstButtonName'];
  //   this.secondButtonName = queryParams['secondButtonName'];

  // });

  //   this.editorInit = { // Initialize the configuration object for TinyMCE editor
  //   id: 'discussit',
  //   base_url: '/tinymce',
  //   suffix: '.min',
  //   plugins: 'lists link image table code help wordcount', // List of plugins to include in the editor
  //   placeholder: 'Type your content here...',
  //   file_picker_callback: (callback: any, value: any, meta: any) => {  //to attach images directly from system
  //     const input = document.createElement('input'); // Create a new input element of type 'file'
  //     input.setAttribute('type', 'file'); // Set the type attribute of the input element to 'file'
  //     input.setAttribute('accept', 'image/*'); // Set the accept attribute to allow only image files

  //     input.onchange = () => { // Attach an onchange event handler to the input element
  //       const file = (input.files as FileList)[0]; // Retrieve the selected file from the input element
  //       const reader = new FileReader(); // Create a new FileReader to read the file content

  //       reader.onload = () => {// Set up a callback for when the FileReader has loaded the file content
  //         const base64 = reader.result as string;  // Convert the file content to base64 encoding
  //         callback(base64, { alt: file.name });  // Call the TinyMCE callback with the base64-encoded data and file metadata
  //       };
  //       // Read the file content as a data URL
  //       reader.readAsDataURL(file);
  //     };
  //     // Programmatically trigger a click event on the input element to open the file picker dialog
  //     input.click();
  //   },
  //   setup: (editor: { on: (arg0: string, arg1: () => void) => void; getContent: () => any; }) => {
  //   // The editor parameter is an object with two properties: 'on' and 'getContent'.
  //   // 'on' is a method to attach an event listener to the editor.
  //   // It takes an event name (arg0: string) and a callback function (arg1: () => void).
  //   // In this case, it's listening for the 'change' event and updating 'editorContent'.

  //     editor.on('change', () => { // Event listener for the 'change' event in the editor
  //       this.editorContent = editor.getContent(); // Update the component's 'editorContent' property with the current content of the editor
  //     });
  //   }
  // };

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      // Retrieve the value of communityCategoryMappingID from the query parameters
      this.communityCategoryMappingID = +params['communityCategoryMappingID'];
    });
  }

  goBack() {
    // Use the dynamically retrieved communityCategoryMappingID in the navigation
    this.router.navigate(['/community/category-posts'], {
      queryParams: {
        communityCategoryMappingID: this.communityCategoryMappingID,
      },
    });
  }

  onSubmit(content: any) {
    const communityCategoryMappingId =
      +this.route.snapshot.queryParams['communityCategoryMappingID'];
    const creatorId =
      this.route.snapshot.queryParams['creatorId'] ||
      '636544A4-6255-478C-A8E8-DAEE14E90074';
    // const content = this.editorContent;

    const url = `https://localhost:7160/api/Thread?CommunityCategoryMappingId=${communityCategoryMappingId}&CreatorId=${creatorId}`;

    this.http
      .post(url, JSON.stringify(content), {
        headers: {
          'Content-Type': 'application/json',
          Accept: '*/*',
        },
      })
      .subscribe({
        next: (response) => {
          console.log('Thread created successfully:', response);
          // Show success message
          this.bsModalRef = this.modalService.show(SuccessPopupComponent, {
            initialState: {
              message: 'Thread created successfully', //make use of reusable success pop up , sends message to it
            },
          });
        },
        error: (error) => {
          console.error('Error creating thread:', error);
        },
        complete: () => {
          // This block will be executed when the observable completes (optional)
          // routing to posts page
          this.router.navigate(['category_posts'], {
            queryParams: {
              communityCategoryMappingID: this.communityCategoryMappingID,
            },
          });
        },
      });
  }
}
