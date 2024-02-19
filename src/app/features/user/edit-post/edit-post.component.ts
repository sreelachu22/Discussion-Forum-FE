import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { SuccessPopupComponent } from 'src/app/components/ui/success-popup/success-popup.component';
import { environment } from 'src/app/environments/environment';
import { TagService } from 'src/app/service/HttpServices/tag.service';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css'],
})
export class EditPostComponent {
  editorContent: any;
  bsModalRef!: BsModalRef;
  communityCategoryMappingID!: number;
  title!: string;
  tagsAsStringArray: any;
  existingTags!: { display: string; value: string }[];
  threadID!: number;

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
    { label: 'Category', route: '/community/category-posts' },
    { label: 'Edit Post', route: '/category-posts/edit-posts' },
  ];

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.communityCategoryMappingID = +params['communityCategoryMappingID'];
      this.threadID = +params['threadID'];
    });

    this.tags.getAllTags().subscribe((data) => {
      this.existingTags = data.map((tag: { tagName: any }) => ({
        display: tag.tagName,
        value: tag.tagName,
      }));
    });
  }

  goBack() {
    this.router.navigate(['/community/category-posts'], {
      queryParams: {
        communityCategoryMappingID: this.communityCategoryMappingID,
      },
    });
  }
  baseUrl: string = environment.apiUrl;
  onSubmit(eventPayload: {
    title: string;
    editorContent: string;
    tags: any[];
  }) {
    const tags = eventPayload.tags;
    this.tagsAsStringArray = tags.map((tag) => tag.value);

    const content = {
      Title: eventPayload.title,
      Content: eventPayload.editorContent,
      Tags: this.tagsAsStringArray,
    };

    const ActiveUserId =
      this.route.snapshot.queryParams['creatorId'] ||
      sessionStorage.getItem('userID');

    const url =
      this.baseUrl + `Thread/${this.threadID}?ModifierId=${ActiveUserId}`;

    this.http
      .put(url, JSON.stringify(content), {
        headers: {
          'Content-Type': 'application/json',
          Accept: '*/*',
        },
      })
      .subscribe({
        next: (response) => {
          this.bsModalRef = this.modalService.show(SuccessPopupComponent, {
            initialState: {
              message: 'Post edited successfully',
            },
          });
        },
        error: (error) => {
          console.error('Error updating post:', error);
        },
        complete: () => {
          this.router.navigate(['/community/category-posts'], {
            queryParams: {
              communityCategoryMappingID: this.communityCategoryMappingID,
            },
          });
        },
      });
  }
}
