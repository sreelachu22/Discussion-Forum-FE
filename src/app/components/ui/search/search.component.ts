import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { searchService } from 'src/app/service/HttpServices/search.service';

export interface IsSearchThreadResult {
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

export interface IsSearchTagResult {
  isSearchTag: boolean;
  searchTagList: TagDto[];
}

export interface TagDto {
  tagId: number;
  tagName: string;
  tagCount: number;
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
  SearchThreadsDropDown: CategoryThreadDto[] | TagDto[] = [];
  dropdowntoggle: boolean = false;
  private searchTermSubject = new Subject<string>();

  isSearchTag: boolean = true;

  @ViewChild('dropdown') dropdown!: ElementRef;

  constructor(private router: Router, private searchService: searchService) {}

  InputChange(event: any) {
    this.searchTermSubject.next((event as string).trim());
    this.searchTerm = (event as string).trim();
    if (this.searchTerm.length == 0) {
      this.dropdowntoggle = false;
    }
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
            this.dropdowntoggle = false;
            return of([]);
          }
        })
      )
      .subscribe({
        next: (results: any) => {
          if (results.isSearchTag) {
            this.SearchThreadsDropDown = results.searchTagList;
            this.isSearchTag = true;
          } else {
            this.SearchThreadsDropDown = results.searchThreadDtoList;
            this.isSearchTag = false;
          }

          this.dropdowntoggle = true;
        },
        error: (error: any) => {
          console.error('Error fetching search results:', error);
        },
      });
  }

  searchResult() {
    this.router.navigate(['/search-results'], {
      queryParams: {
        searchTerm: this.searchTerm,
        isSearchTag: this.isSearchTag,
      },
    });
  }

  selectResult(selectedItem: any) {
    this.dropdowntoggle = false;
    if (this.isSearchTag) {
      this.router.navigate(['/search-results'], {
        queryParams: {
          searchTerm: selectedItem.tagName,
          isSearchTag: this.isSearchTag,
        },
      });
    } else {
      this.router.navigate([`/community/post-replies`], {
        queryParams: { threadID: selectedItem.threadID },
      });
    }
  }

  @HostListener('document:click', ['$event'])
  clickoutside(event: { target: any }) {
    if (!this.dropdown.nativeElement.contains(event.target)) {
      this.dropdowntoggle = false;
    }
  }
}
