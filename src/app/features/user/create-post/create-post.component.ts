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
  
  constructor(private route: ActivatedRoute,private modalService: BsModalService,private http: HttpClient,private router: Router,) {}

  breadcrumbs = [
    { label: 'Home', route: '/home' },
    { label: 'Community', route: '/community' },
    { label: 'Category', route: '/community/category-posts/:categoryID' },
    { label: 'Create Post', route: '/category-posts/create-posts' },
  ];
  

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
