import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  CategoryThreadDto,
  SearchThreadResult,
} from 'src/app/components/ui/search/search.component';
import { searchService } from 'src/app/service/HttpServices/search.service';

export interface Threads {
  threadID: number;
  communityCategoryMappingID: number;
  content: string;
  threadStatusID: number;
  isAnswered: boolean;
  isDeleted: boolean;
  createdBy: string;
  createdAt: string;
  modifiedBy: Date;
  modifiedAt: Date;
  communityCategoryMapping: any;
  threadStatus: any;
  createdByUser: string;
  modifiedByUser: string;
  threadVotes: any;
  replyCount: number;
}
@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css'],
})
export class SearchResultComponent implements OnInit {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private searchService: searchService
  ) {}

  breadcrumbs = [
    { label: 'Home', route: '/home' },
    { label: 'Community', route: '/community' },
    { label: 'Search Results', route: '/search-results' },
  ];

  threads: CategoryThreadDto[] = [];

  searchTerm: string = '';
  isResultFound = false;
  pageNumber: number = 1;
  pageSize: number = 40;
  totalPages: number = 0;
  currentPage: number = 1;

  ngOnInit() {
    this.route.queryParams.subscribe((queryParams) => {
      this.searchTerm = queryParams['searchTerm'];
      this.loadThreads();
    });
  }

  searchResult(searchTerm: string) {
    if (searchTerm) {
      this.router.navigate(['/search-results'], {
        queryParams: { searchTerm: searchTerm },
      });
    }
  }

  navigateToThreadReplies(threadID: number) {
    this.router.navigate([`/community/post-replies`], {
      queryParams: { threadID: threadID },
    });
  }

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

  changePage(newPage: number) {
    if (newPage >= 1 && newPage <= this.totalPages) {
      this.currentPage = newPage;
      console.log(this.currentPage);
      this.loadThreads();
    }
  }

  loadThreads() {
    if (this.searchTerm) {
      // Call the search service with the updated logic
      this.searchService
        .searchThreads(this.searchTerm, this.pageNumber, this.pageSize)
        .subscribe({
          next: (results: SearchThreadResult) => {
            console.log(results);
            this.threads = results.searchThreadDtoList;
            this.totalPages = Math.ceil(
              results.searchThreadDtoListLength / this.pageSize
            );
          },
          error: (error: Error) => {
            alert('Error has occurred, ' + error.message);
          },
          complete: () => {},
        });
    }
  }
}
