import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private http: HttpClient, private router: Router,private modalService: BsModalService) {}

  ngOnInit() {
    this.editorInit = {
    id: 'discussit',
    base_url: '/tinymce',
    suffix: '.min',
    plugins: 'lists link image table code help wordcount',
    placeholder: 'Type your content here...',
    setup: (editor: { on: (arg0: string, arg1: () => void) => void; getContent: () => any; }) => {
      editor.on('change', () => {
        this.editorContent = editor.getContent();
      });
    }
  };
  }

  goBack() {
    this.router.navigate(['category_threads'], {
    });
  }

  onSubmit() {
    const communityCategoryMappingId = 1;
    const creatorId = '636544A4-6255-478C-A8E8-DAEE14E90074';
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
            message: 'Thread created successfully'
          }
        });
        
      },
      error: (error) => {
        console.error('Error creating thread:', error);
      },
      complete: () => {
        // This block will be executed when the observable completes (optional)
        this.router.navigate(['category_threads']);
      }
    });
  }
}