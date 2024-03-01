import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  CategoryThreadDto,
  IsSearchThreadResult,
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
export class SearchResultComponent {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private searchService: searchService,
    private el: ElementRef,
    private renderer: Renderer2
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

  isSearchTag: boolean = false;

  ngOnInit() {
    this.route.queryParams.subscribe((queryParams) => {
      this.searchTerm = queryParams['searchTerm'];
      this.loadThreads(queryParams['isSearchTag']);
    });
  }

  ngAfterContentInit() {
    setTimeout(() => {
      this.applyStylesToElementByClassName('tags');
    }, 300);
  }

  private applyStylesToElementByClassName(className: string): void {
    const elements = this.el.nativeElement.getElementsByClassName(className);
    console.log(elements);
    for (let i = 0; i < elements.length; i++) {
      const element = elements[i];
      this.renderer.setStyle(element, 'width', '100px');
      this.renderer.setStyle(element, 'border-radius', '5px');
      this.renderer.setStyle(element, 'margin-left', '2px');
      this.renderer.setStyle(element, 'margin-right', '2px');
      this.renderer.setStyle(
        element,
        'background-color',
        'rgb(100 156 245 / 20%)'
      );
      this.renderer.setStyle(element, 'padding', '3px 4px');
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

  loadThreads(isSearchTag: boolean) {
    if (this.searchTerm) {
      if (isSearchTag == false) {
        this.isSearchTag = false;
        this.searchService
          .searchThreads(this.searchTerm, this.pageNumber, this.pageSize)
          .subscribe({
            next: (results: IsSearchThreadResult) => {
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
      } else {
        this.isSearchTag = true;
        this.searchService
          .displaySearchedThreads(
            this.searchTerm,
            this.pageNumber,
            this.pageSize,
            this.selectedFilterOption,
            this.selectedSortOption
          )
          .subscribe({
            next: (results: IsSearchThreadResult) => {
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

  filterOptions: string[] = ['Replies', 'Votes', 'Date Posted'];

  selectedFilterOption: number = 0;
  selectedSortOption: number = 2;
  dateSelected: boolean = false;

  onFilterSelectionChange(event: string) {
    const lowerCaseSelectedOption = event.toLowerCase();
    const lowerCaseFilterOptions = this.filterOptions.map((option) =>
      option.toLowerCase()
    );
    this.selectedFilterOption = lowerCaseFilterOptions.indexOf(
      lowerCaseSelectedOption
    );
    this.selectedFilterOption == 2
      ? (this.dateSelected = true)
      : (this.dateSelected = false);
    this.loadThreads(this.isSearchTag);
  }

  onSortSelectionChange(event: number) {
    this.selectedSortOption = event;
    this.loadThreads(this.isSearchTag);
  }
}
