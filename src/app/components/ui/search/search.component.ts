import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { searchService } from 'src/app/service/HttpServices/search.service';

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
  dropdowntoggle: boolean = true;

  @ViewChild('dropdown')
  dropdown!: ElementRef;

  InputChange(event: any) {
    this.searchTerm = (event as string).trim();
    if (this.searchTerm) {
      this.searchService.searchThreads(this.searchTerm).subscribe({
        next: (results: Thread[]) => {
          this.SearchThreadsDropDown = results;
          this.dropdowntoggle = true;
        },
      });
    } else {
      this.dropdowntoggle = false;
    }
  }

  searchResult() {
    this.router.navigate(['/search-results'], {
      queryParams: { searchTerm: this.searchTerm },
    });
  }

  selectResult(selectedThread: Thread) {
    this.dropdowntoggle = false;
    this.router.navigate(['/thread-replies'], {
      queryParams: { threadID: selectedThread.threadID },
    });
  }

  @HostListener('document:click', ['$event'])
  clickoutside(event: { target: any }) {
    if (!this.dropdown.nativeElement.contains(event.target)) {
      this.dropdowntoggle = false;
    }
  }
}
