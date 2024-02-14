import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { SuccessPopupComponent } from 'src/app/components/ui/success-popup/success-popup.component';
import { CommunityDataService } from 'src/app/service/DataServices/community-data.service';
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
  editorContent: any;
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
    private tags: TagService,
    private communityDataService : CommunityDataService
  ) {}

  breadcrumbs = [
    { label: 'Home', route: '/home' },
    { label: 'Community', route: '/community' },
    { label: 'Category', route: '/community/category-posts' },
    { label: 'Create Post', route: '/category-posts/create-posts' },
  ];

  ngOnInit() {
    // this.route.queryParams.subscribe((params) => {
    //   this.communityCategoryMappingID = +params['communityCategoryMappingID'];
    // });
    this.communityDataService.communityID$.subscribe((id) => {
      this.communityCategoryMappingID = id;
    });

    this.tags.getAllTags().subscribe((data) => {
      this.existingTags = data.map((tag: { tagName: any }) => ({
        display: tag.tagName,
        value: tag.tagName,
      }));
    });
  }

  goBack() {
    this.router.navigate(['/community/category-posts'])
    // , {
    //   queryParams: {
    //     communityCategoryMappingID: this.communityCategoryMappingID,
    //   },
    // });
  }

  onSubmit(eventPayload: {
    title: string;
    editorContent: string;
    tags: any[];
  }) {
    const { title, editorContent, tags } = eventPayload;
    this.tagsAsStringArray = tags.map((tag) => tag.value);

    const content = {
      Title: title,
      Content: editorContent,
      Tags: this.tagsAsStringArray,
    };

    // const communityCategoryMappingId =
    //   +this.route.snapshot.queryParams['communityCategoryMappingID'];
    const creatorId =
      this.route.snapshot.queryParams['creatorId'] ||
      sessionStorage.getItem('userID');

    const url = `https://localhost:7160/api/Thread?communityMappingId=${this.communityCategoryMappingID}&userId=${creatorId}`;

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
          this.bsModalRef = this.modalService.show(SuccessPopupComponent, {
            initialState: {
              message: 'Post created successfully',
            },
          });
        },
        error: (error) => {
          console.error('Error creating post:', error);
        },
        complete: () => {
          this.router.navigate(['/community/category-posts'])
          // , {
          //   queryParams: {
          //     communityCategoryMappingID: this.communityCategoryMappingID,
          //   },
          // });
        },
      });
  }
}
