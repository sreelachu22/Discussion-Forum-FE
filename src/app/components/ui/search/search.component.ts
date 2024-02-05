import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { searchService } from 'src/app/service/HttpServices/search.service';
import {
  debounceTime,
  distinctUntilChanged,
  switchMap,
  throttleTime,
} from 'rxjs/operators';

export interface Thread {
  communityCategoryMapping: any;
  communityCategoryMappingID: number;
  content: string;
  createdAt: string;
  createdBy: string;
  createdByUser: any;
  isAnswered: boolean;
  isDeleted: boolean;
  modifiedAt: string;
  modifiedBy: string;
  modifiedByUser: any;
  threadID: number;
  threadStatus: any;
  threadStatusID: number;
  threadVotes: any;
  title: string;
}

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent {
  constructor(private router: Router, private searchService: searchService) {}

  searchTerm: string = '';
  SearchThreadsDropDown: Thread[] = [];

  InputChange(event: any) {
    this.searchTerm = event;
    this.searchService.searchThreads(this.searchTerm).subscribe({
      next: (results: Thread[]) => {
        this.SearchThreadsDropDown = results;
      },
    });
  }

  searchResult() {
    this.router.navigate(['/search-result'], {
      queryParams: { searchTerm: this.searchTerm },
    });
  }

  selectResult(selectedThread: Thread) {
    // Handle the selection of a dropdown result
    console.log('Selected Thread:', selectedThread);
    // You can add additional logic here if needed
  }
}
