import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryMappingService } from 'src/app/service/DataServices/category-mapping.service';
import { CommunityDataService } from 'src/app/service/DataServices/community-data.service';
import { LoaderService } from 'src/app/service/HttpServices/loader.service';
import { ThreadService } from 'src/app/service/HttpServices/thread.service';

// interface for response data
interface ThreadResponse {
  threads: Thread[];
  totalCount: number;
  categoryName: string;
  categoryDescription: string;
  pageSize: number;
  currentPage: number;
  totalPages: number;
}

interface Thread {
  threadID: number;
  title: string;
  content: string;
  createdByUser: string;
  createdAt: string;
  modifiedByUser: string;
  modifiedAt: string;
  threadStatusName: string;
  isAnswered: boolean;
  upVoteCount: number;
  downVoteCount: number;
  tagNames: string[];
  replyCount: number;
}

@Component({
  selector: 'app-category-threads',
  templateUrl: './category-threads.component.html',
  styleUrls: ['./category-threads.component.css'],
})
export class CategoryThreadsComponent implements OnInit {
  // templete variables
  CategoryThreads!: ThreadResponse;
  communityCategoryMappingID!: number;
  communityID!: number;
  currentPage: number = 1;
  pageSize: number = 9;
  totalPages: number = 0;
  creatorId!: string;

  breadcrumbs = [
    { label: 'Home', route: '/home' },
    { label: 'Community', route: '/community' },
    {
      label: 'Category',
      route: '/community/category-posts',
    },
  ];

  constructor(
    private threadService: ThreadService,
    private activateRoute: ActivatedRoute,
    private router: Router,
    private loaderService: LoaderService,
    private communityDataService:CommunityDataService,
    private categoryMappingService : CategoryMappingService
  ) {}

  isLoading = false;
  // ng init with method to get url params and display content based on it

  ngOnInit() {
    this.communityDataService.communityID$.subscribe((id) => {
      this.communityID = id;
    });
    this.categoryMappingService.communityCategoryMappingID$.subscribe((id) => {
      this.communityCategoryMappingID = id;
    });
    this.loadThreads();
    this.loaderService.isLoading$.subscribe((isLoading) => {
      this.isLoading = isLoading;
    });
  }

  loadThreads() {
    this.threadService
      .getThread(
        this.communityCategoryMappingID,
        this.currentPage,
        this.pageSize
      )
      .subscribe({
        next: (data: ThreadResponse) => {
          this.CategoryThreads = data;
          this.totalPages = Math.ceil(
            this.CategoryThreads.totalCount / this.pageSize
          );
        },
        error: (error: Error) => {
          console.log('Error', error);
        },
      });
  }

  // paginations logics

  changePage(newPage: number) {
    if (newPage >= 1 && newPage <= this.totalPages) {
      this.currentPage = newPage;
      this.loadThreads();
    }
  }

  // user friendly data format
  formatDate(date: string | null): string {
    if (!date) {
      return 'N/A';
    }

    const currentDate = new Date();
    const inputDate = new Date(date);

    const timeDifference = currentDate.getTime() - inputDate.getTime();
    const secondsDifference = Math.floor(timeDifference / 1000);
    const minutesDifference = Math.floor(secondsDifference / 60);
    const hoursDifference = Math.floor(minutesDifference / 60);
    const daysDifference = Math.floor(hoursDifference / 24);

    if (daysDifference > 3) {
      return (
        'on ' +
        inputDate.toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        })
      );
    } else if (hoursDifference >= 1) {
      return `${hoursDifference} ${
        hoursDifference === 1 ? 'hour' : 'hours'
      } ago`;
    } else if (minutesDifference >= 1) {
      return `${minutesDifference} ${
        minutesDifference === 1 ? 'minute' : 'minutes'
      } ago`;
    } else {
      return '1 minute ago';
    }
  }

  // create a post
  createPost() {
    const queryParams = {
      creatorId: this.creatorId || sessionStorage.getItem('userID'), // Replace this with the actual creatorId
    };

    this.router.navigate(['/category-posts/create-posts'], {
      queryParams,
    });
  }
  navigateToThreadReplies(threadID: number) {
    this.router.navigate([`/community/post-replies`]
    , {
      queryParams: {
        threadID: threadID,
      },
    });
  }
}
