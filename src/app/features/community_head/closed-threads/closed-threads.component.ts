import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommunityDataService } from 'src/app/service/DataServices/community-data.service';
import { LoaderService } from 'src/app/service/HttpServices/loader.service';
import { ThreadService } from 'src/app/service/HttpServices/thread.service';

// interface for response data
interface ThreadResponse {
  threads: Thread[];
  totalCount: number;
  communityName: string;
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
}

@Component({
  selector: 'app-closed-threads',
  templateUrl: './closed-threads.component.html',
  styleUrls: ['./closed-threads.component.css'],
})
export class ClosedThreadsComponent {
  // templete variables
  CategoryThreads!: ThreadResponse;
  pages: number[] = [];
  currentPage: number = 1;
  pageSize: number = 5;
  totalPages: number = 0;
  creatorId!: string;

  breadcrumbs = [
    { label: 'Home', route: '/home' },
    { label: 'Community', route: '/community' },
    {
      label: 'Community Management',
      route: `/community-management-dashboard`,
    },
    {
      label: 'Closed Threads',
      route: '/closed-threads',
    },
  ];

  constructor(
    private threadService: ThreadService,
    private activateRoute: ActivatedRoute,
    private router: Router,
    private loaderService: LoaderService,
    private communityDataService: CommunityDataService
  ) {}

  isLoading = false;
  communityID: number = 0;
  // ng init with method to get url params and display content based on it
  ngOnInit() {
    this.loaderService.isLoading$.subscribe((isLoading) => {
      this.isLoading = isLoading;
    });
    // this.activateRoute.queryParams.subscribe((params) => {
    //   this.communityID = 1;
    // });
    this.communityDataService.communityID$.subscribe((id) => {
      this.communityID = id;
    });
    this.loadThreads();
  }

  loadThreads() {
    this.threadService
      .getClosedThread(this.communityID, this.currentPage, this.pageSize)
      .subscribe({
        next: (data: ThreadResponse) => {
          this.CategoryThreads = data;
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
