import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { searchService } from 'src/app/service/HttpServices/search.service';

export interface SearchThreadResult {
  searchThreadDtoList: CategoryThreadDto[];
  searchThreadDtoListLength: number;
}

export interface CategoryThreadDto {
  threadID: number;
  title: string;
  content: string;
  createdByUser: string;
  createdAt: string;
  modifiedByUser: string | null;
  modifiedAt: string;
  threadStatusName: string;
  isAnswered: boolean;
  upVoteCount: number;
  downVoteCount: number;
  tagNames: string[];
  replyCount: number;
}

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
  pageNumber: number = 1;
  pageSize: number = 10;

  searchTerm: string = '';
  SearchThreadsDropDown: CategoryThreadDto[] = [];
  dropdowntoggle: boolean = false;
  private searchTermSubject = new Subject<string>();

  @ViewChild('dropdown') dropdown!: ElementRef;

  constructor(private router: Router, private searchService: searchService) {}

  InputChange(event: any) {
    this.searchTermSubject.next((event as string).trim());
    this.searchTerm = (event as string).trim();
  }

  ngOnInit() {
    this.searchTermSubject
      .pipe(
        debounceTime(700),
        distinctUntilChanged(),
        switchMap((searchTerm: string) => {
          if (searchTerm) {
            return this.searchService.searchThreads(
              searchTerm,
              this.pageNumber,
              this.pageSize
            );
          } else {
            return of([]);
          }
        })
      )
      .subscribe({
        next: (results: SearchThreadResult) => {
          this.SearchThreadsDropDown = results.searchThreadDtoList;
          this.dropdowntoggle = true;
        },
        error: (error: any) => {
          console.error('Error fetching search results:', error);
        },
      });
  }

  searchResult() {
    this.router.navigate(['/search-results'], {
      queryParams: { searchTerm: this.searchTerm },
    });
  }

  selectResult(selectedThread: Thread) {
    this.dropdowntoggle = false;
    this.router.navigate([`/community/post-replies`], {
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
