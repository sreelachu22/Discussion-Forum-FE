import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { SuccessPopupComponent } from 'src/app/components/ui/success-popup/success-popup.component';
import { CategoryMappingService } from 'src/app/service/DataServices/category-mapping.service';
import { CommunityDataService } from 'src/app/service/DataServices/community-data.service';
import { environment } from 'src/app/environments/environment';
import { LoaderService } from 'src/app/service/HttpServices/loader.service';
import { TagService } from 'src/app/service/HttpServices/tag.service';
import { CommunityDetails, CommunityService } from 'src/app/service/HttpServices/community.service';
import { CategoryService } from 'src/app/service/HttpServices/category.service';

export interface Tag {
  tagId: number;
  tagName: string;
  tagCount: number;
}

@Component({
  selector: 'app-first-post',
  templateUrl: './first-post.component.html',
  styleUrls: ['./first-post.component.css']
})

export class FirstPostComponent {
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
    private categoryMappingService: CategoryMappingService,
    private httpService: CommunityService,
    private categoryService: CategoryService,
  ) {}

  categoryDropdownEnabled: boolean = false;
  communityName : string | null = '';
  breadcrumbs: { label: string; route: string; }[] = [];
  communities: CommunityDetails[] = [];
  parentDropdownOptions: string[] = [];
  childDropdownOptions: string[] = [];
  communityID!: number;
  communityCategoryID!: number;
  isLoading: boolean = false;
  categories: any[] = [];
  ngOnInit() {
    this.loaderService.isLoading$.subscribe((isLoading) => {
      this.isLoading = isLoading;
    });
    this.loadCommunities();
    this.getCategories();
    this.tags.getAllTags().subscribe((data) => {
      this.existingTags = data.map((tag: { tagName: any }) => ({
        display: tag.tagName,
        value: tag.tagName,
      }));
    });
    this.breadcrumbs = [
      { label: 'Home', route: '/home' },
      { label: 'Create Post', route: '/category-posts/create-posts' },
    ];
  }

  loadCommunities() {
    this.httpService.getAllCommunities().subscribe((data) => {
      this.communities = data;
      this.parentDropdownOptions = data.map(
        (community) => community.communityName
      );
    });
  }
  handleOptionSelected(option: string) {
    const selectedCommunity = this.communities.find(
      (community) => community.communityName === option
    );
    if (selectedCommunity) {
      this.communityID = selectedCommunity.communityID;
      this.categoryDropdownEnabled = true; // Enable category dropdown
      this.getCategories(); // Load categories for selected community
    } else {
      console.error('Community not found:', option);
      return;
    }
  }
  
  getCategories() {
    this.categoryService
      .getCategories(this.communityID)
      .subscribe((data: any[]) => {
        this.categories = data;
        this.childDropdownOptions = data.map(
          (category) => category.communityCategoryName
        );
      });
  }
  
  handleCategorySelected(option: string) {
      const selectedCategory = this.categories.find(
        (category) => category.communityCategoryName === option
      );
      if (selectedCategory) {
        this.communityCategoryID = selectedCategory.communityCategoryID;
        this.categoryMappingService.setcategoryMappingIDData(
          selectedCategory.communityCategoryMappingID
        );
        this.categoryMappingService.communityCategoryMappingID$.subscribe((id) => {
          this.communityCategoryMappingID = id;
        });
      } else {
        console.error('Category not found:', option);
        return;
      }
  }

  goBack() {
    this.router.navigate(['/home']);
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
