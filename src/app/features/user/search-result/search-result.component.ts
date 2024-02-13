import { Component } from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  Router,
} from '@angular/router';
import { forkJoin } from 'rxjs/internal/observable/forkJoin';
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
  createdByUser: any;
  modifiedByUser: any;
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

  threads: Threads[] = [];

  searchTerm: string = '';
  isResultFound = false;

  ngOnInit() {
    this.route.queryParams.subscribe((queryParams) => {
      this.searchTerm = queryParams['searchTerm'];
      if (this.searchTerm) {
        // Call the search service with the updated logic
        this.searchService.searchThreads(this.searchTerm).subscribe({
          next: (results: any[]) => {
            console.log(results.length);
            this.threads = results;
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
}
