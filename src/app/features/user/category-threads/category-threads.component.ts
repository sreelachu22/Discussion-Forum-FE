import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  createdBy: string;
  createdAt: string;
  modifiedBy: string;
  modifiedAt: string;
  threadStatusName: string;
  isAnswered: boolean;
  upVoteCount: number;
  downVoteCount: number;
  tagNames: string[];
}

@Component({
  selector: 'app-category-threads',
  templateUrl: './category-threads.component.html',
  styleUrls: ['./category-threads.component.css'],
})
export class CategoryThreadsComponent implements OnInit {
  // templete variables
  CategoryThreads!: ThreadResponse;
  pages: number[] = [];
  communityCategoryMappingID!: number;
  currentPage: number = 1;
  pageSize: number = 5;
  totalPages: number = 0;
  creatorId!: string;

  breadcrumbs = [
    { label: 'Home', route: '/home' },
    { label: 'Community', route: '/community' },
    {
      label: 'Category',
      route: `/community/category-posts/${this.communityCategoryMappingID}`,
    },
  ];

  constructor(
    private threadService: ThreadService,
    private activateRoute: ActivatedRoute,
    private router: Router,
    private loaderService: LoaderService
  ) {}

  isLoading = false;
  // ng init with method to get url params and display content based on it
  ngOnInit() {
    this.activateRoute.queryParams.subscribe((params) => {
      this.communityCategoryMappingID = params['communityCategoryMappingID'];
    });
    console.log(this.communityCategoryMappingID);
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
          console.log(this.CategoryThreads);
          this.totalPages = Math.ceil(
            this.CategoryThreads.totalCount / this.pageSize
          ); // Calculate totalPages
          this.updatePageNumbers();
        },
        error: (error: Error) => {
          console.log('Error', error);
        },
      });
  }

  // paginations logics
  updatePageNumbers() {
    const pagesToShow = Math.min(this.totalPages, 3);
    const startPage = Math.max(1, this.currentPage - 1);
    const endPage = Math.min(this.totalPages, startPage + pagesToShow - 1);

    this.pages = Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    );
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadThreads();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadThreads();
    }
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
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
      communityCategoryMappingID: this.communityCategoryMappingID,
      creatorId: this.creatorId || '636544A4-6255-478C-A8E8-DAEE14E90074', // Replace this with the actual creatorId
    };

    this.router.navigate(['/category-posts/create-posts'], {
      queryParams,
    });
  }
  navigateToThreadReplies(threadID: number) {
    this.router.navigate([`/community/post-replies`], {
      queryParams: {
        threadID: threadID,
        communityCategoryMappingID: this.communityCategoryMappingID,
      },
    });
  }

  searchTerm: string = '';
  searchResult(searchTerm: string) {
    this.router.navigate(['/search-results'], {
      queryParams: { searchTerm: this.searchTerm },
    });
  }

  changePage(newPage: number) {
    if (newPage >= 1 && newPage <= this.totalPages) {
      this.currentPage = newPage;
      this.loadThreads();
    }
  }
}
