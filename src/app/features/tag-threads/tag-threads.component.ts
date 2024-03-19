import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { searchService } from 'src/app/service/HttpServices/search.service';
import { IsSearchThreadResult } from 'src/app/components/ui/search/search.component';
@Component({
  selector: 'app-tag-threads',
  templateUrl: './tag-threads.component.html',
  styleUrls: ['./tag-threads.component.css'],
})
export class TagThreadsComponent implements OnInit {
  tagName: string = '';
  threads: any = [];
  filterOptions: string[] = ['Replies', 'Votes', 'Date Posted'];
  selectedFilterOption: number = 0;
  selectedSortOption: number = 2;
  dateSelected: boolean = false;

  searchTerm: string = '';
  pageNumber: number = 1;
  pageSize: number = 40;
  totalPages: number = 0;
  currentPage: number = 1;

  constructor(
    private route: ActivatedRoute,
    private searchService: searchService,
    private router: Router,
    private renderer: Renderer2,
    private el: ElementRef
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.tagName = params['tagName'];
      this.searchTerm = this.tagName;
      console.log('Tag name:', this.tagName);
    });
    this.getTaggedThreads(this.tagName);
  }

  ngAfterViewChecked() {
    this.applyStylesToElementByClassName('tags');
  }

  private applyStylesToElementByClassName(className: string): void {
    const elements = this.el.nativeElement.getElementsByClassName(className);
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

  getTaggedThreads(tagName: string) {
    this.searchService.searchThreads(tagName, 1, 40).subscribe({
      next: (data: any) => {
        this.threads = data.searchThreadDtoList;
      },
    });
  }

  loadThreads() {
    console.log(this.searchTerm);
    if (this.searchTerm) {
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

  onSortSelectionChange(event: number) {
    this.selectedSortOption = event;
    this.loadThreads();
  }

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
    this.loadThreads();
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
