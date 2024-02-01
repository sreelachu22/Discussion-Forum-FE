import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { SuccessPopupComponent } from 'src/app/components/ui/success-popup/success-popup.component';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent {
  bsModalRef!: BsModalRef;
  editorContent: any;
  editorInit: any;
  communityCategoryMappingID!: number;

  constructor(private http: HttpClient,private route: ActivatedRoute, private router: Router,private modalService: BsModalService) {}

  ngOnInit() {
    this.editorInit = { // Initialize the configuration object for TinyMCE editor
    id: 'discussit',
    base_url: '/tinymce',
    suffix: '.min',
    plugins: 'lists link image table code help wordcount', // List of plugins to include in the editor
    placeholder: 'Type your content here...',
    file_picker_callback: (callback: any, value: any, meta: any) => {
      const input = document.createElement('input');
      input.setAttribute('type', 'file');
      input.setAttribute('accept', 'image/*');
  
      input.onchange = () => {
        const file = (input.files as FileList)[0];
        const reader = new FileReader();
  
        reader.onload = () => {
          const base64 = reader.result as string;
          callback(base64, { alt: file.name });
        };
  
        reader.readAsDataURL(file);
      };
  
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

  this.route.queryParams.subscribe(params => {
    // Retrieve the value of communityCategoryMappingID from the query parameters
    this.communityCategoryMappingID = +params['communityCategoryMappingID'];
  });
  }

  
  goBack() {
    // Use the dynamically retrieved communityCategoryMappingID in the navigation
    this.router.navigate(['category_threads'], {
      queryParams: { communityCategoryMappingID: this.communityCategoryMappingID }
    });
  }

  onSubmit() {
    const communityCategoryMappingId = +this.route.snapshot.queryParams['communityCategoryMappingID'];
    const creatorId = this.route.snapshot.queryParams['creatorId'] || '636544A4-6255-478C-A8E8-DAEE14E90074';
    const content = this.editorContent;
  
    const url = `https://localhost:7160/api/Thread?CommunityCategoryMappingId=${communityCategoryMappingId}&CreatorId=${creatorId}`;
  
    this.http.post(url, JSON.stringify(content), {
      headers: {
        'Content-Type': 'application/json',
        'Accept': '*/*'
      }
    }).subscribe({
      next: (response) => {
        console.log('Thread created successfully:', response);
        // Show success message
        this.bsModalRef = this.modalService.show(SuccessPopupComponent, {
          initialState: {
            message: 'Thread created successfully' //make use of reusable success pop up , sends message to it
          }
        });
        
      },
      error: (error) => {
        console.error('Error creating thread:', error);
      },
      complete: () => {
        // This block will be executed when the observable completes (optional)
        // routing to posts page
        this.router.navigate(['category_threads'], {
          queryParams: { communityCategoryMappingID: this.communityCategoryMappingID }
        });
      }
    });
  }
}