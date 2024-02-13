import { Component } from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  Router,
} from '@angular/router';
import { forkJoin } from 'rxjs/internal/observable/forkJoin';
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
}
@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css'],
})
export class SearchResultComponent {
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
  pageSize: number = 10;

  ngOnInit() {
    this.route.queryParams.subscribe((queryParams) => {
      this.searchTerm = queryParams['searchTerm'];
      if (this.searchTerm) {
        // Call the search service with the updated logic
        this.searchService
          .searchThreads(this.searchTerm, this.pageNumber, this.pageSize)
          .subscribe({
            next: (results: SearchThreadResult) => {
              console.log(results);
              this.threads = results.searchThreadDtoList;
            },
            error: (error: Error) => {
              alert('Error has occurred, ' + error.message);
            },
            complete: () => {
              //console.log('Completed');
            },
          });
      }
    });
  }

  searchResult(searchTerm: string) {
    if (searchTerm) {
      // Call the search service with the updated logic
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
}
