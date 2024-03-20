import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { SuccessPopupComponent } from 'src/app/components/ui/success-popup/success-popup.component';
import { CategoryMappingService } from 'src/app/service/DataServices/category-mapping.service';
import { CommunityDataService } from 'src/app/service/DataServices/community-data.service';
import { environment } from 'src/app/environments/environment';
import { LoaderService } from 'src/app/service/HttpServices/loader.service';
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
    private loaderService: LoaderService,
    private communityDataService: CommunityDataService,
    private categoryMappingService: CategoryMappingService
  ) {}

  communityName : string | null = '';
  categoryName : string | null = '';
  breadcrumbs: { label: string; route: string; }[] = [];

  isLoading: boolean = false;
  ngOnInit() {
    this.loaderService.isLoading$.subscribe((isLoading) => {
      this.isLoading = isLoading;
    });
    this.categoryMappingService.communityCategoryMappingID$.subscribe((id) => {
      this.communityCategoryMappingID = id;
    });
    this.communityName = sessionStorage.getItem('communityName');
    this.tags.getAllTags().subscribe((data) => {
      this.existingTags = data.map((tag: { tagName: any }) => ({
        display: tag.tagName,
        value: tag.tagName,
      }));
    });
    this.categoryName = sessionStorage.getItem('categoryName');
    this.breadcrumbs = [
      { label: 'Home', route: '/home' },
      { label: this.communityName || '', route: '/community' },
      { label: this.categoryName || '', route: '/community/category-posts' },
      { label: 'Create Post', route: '/category-posts/create-posts' },
    ];
  }

  goBack() {
    this.router.navigate(['/community/category-posts']);
  }
  baseUrl: string = environment.apiUrl;
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

    const creatorId =
      this.route.snapshot.queryParams['creatorId'] ||
      sessionStorage.getItem('userID');

    const url =
      this.baseUrl +
      `Thread?communityMappingId=${this.communityCategoryMappingID}&userId=${creatorId}`;

    this.http
      .post(url, JSON.stringify(content), {
        headers: {
          'Content-Type': 'application/json',
          Accept: '*/*',
        },
      })
      .subscribe({
        next: (response) => {
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
          this.router.navigate(['/community/category-posts']);
        },
      });
  }
}
