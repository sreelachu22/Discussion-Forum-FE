import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { SuccessPopupComponent } from 'src/app/components/ui/success-popup/success-popup.component';
import { TagService } from 'src/app/service/HttpServices/tag.service';

export interface Tag {
  tagId: number;
  tagName: string;
  tagCount: number;
}

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
  title!: string;
  tagsAsStringArray: any;
  existingTags!: { display: string; value: string }[];

  constructor(
    private route: ActivatedRoute,
    private modalService: BsModalService,
    private http: HttpClient,
    private router: Router,
    private tags: TagService
  ) {}

  breadcrumbs = [
    { label: 'Home', route: '/home' },
    { label: 'Community', route: '/community' },
    { label: 'Category', route: '/community/category-posts/:categoryID' },
    { label: 'Create Post', route: '/category-posts/create-posts' },
  ];

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.communityCategoryMappingID = +params['communityCategoryMappingID'];
    });

    this.tags.getAllTags().subscribe((data) => {
      this.existingTags = data.map((tag: { tagName: any }) => ({
        display: tag.tagName,
        value: tag.tagName,
      }));
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

  onSubmit(eventPayload: {
    title: string;
    editorContent: string;
    tags: any[];
  }) {
    const { title, editorContent, tags } = eventPayload;
    this.tagsAsStringArray = tags.map((tag) => tag.value);
    console.log(this.tagsAsStringArray);

    const content = {
      Title: title,
      Content: editorContent,
      Tags: this.tagsAsStringArray,
    };
    console.log(content);

    const communityCategoryMappingId =
      +this.route.snapshot.queryParams['communityCategoryMappingID'];
    const creatorId =
      this.route.snapshot.queryParams['creatorId'] ||
      '962fda5b-3f0b-4523-8dcc-5e7927104e0c';
    // const content = this.editorContent;

    const url = `https://localhost:7160/api/Thread?communityMappingId=${communityCategoryMappingId}&userId=${creatorId}`;

    this.http
      .post(url, JSON.stringify(content), {
        headers: {
          'Content-Type': 'application/json',
          Accept: '*/*',
        },
      })
      .subscribe({
        next: (response) => {
          console.log('Post created successfully:', response);
          // Show success message
          this.bsModalRef = this.modalService.show(SuccessPopupComponent, {
            initialState: {
              message: 'Post created successfully', //make use of reusable success pop up , sends message to it
            },
          });
        },
        error: (error) => {
          console.error('Error creating post:', error);
        },
        complete: () => {
          console.log('hello');
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
