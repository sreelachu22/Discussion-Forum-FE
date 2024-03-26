import { Component, ElementRef, Renderer2} from '@angular/core';
import { Router } from '@angular/router';
import { SavedPost, SavedService } from 'src/app/service/HttpServices/saved.service';
import { Thread } from 'src/app/service/HttpServices/thread.service';
import { ThreadService } from 'src/app/service/HttpServices/thread.service';
@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.css']
})
export class BookmarksComponent {

  breadcrumbs = [
    { label: 'Home', route: '/home' },
    {
      label: 'Bookmarks',
      route: '/bookmarks',
    },
  ];
  savedPosts: SavedPost[] = [];

  constructor(private savedService: SavedService, 
    private router: Router, 
    private threadService: ThreadService,
    private el: ElementRef,
    private renderer: Renderer2) { }

  ngOnInit() {
    // Assuming you have the user ID stored in some variable, replace 'yourUserIdVariable' with the actual user ID
    const userID = sessionStorage.getItem('userID');
    sessionStorage.setItem('categoryName', "Category");
    this.getSavedPosts(userID);
  }

  ngAfterViewChecked() {
    this.applyStylesToElementByClassName('tags');
  }

  getSavedPosts(userID: string | null) {
    this.savedService.getSavedPostsByUserId(userID)
      .subscribe((savedPosts: SavedPost[]) => {
        this.savedPosts = savedPosts;
        console.log(this.savedPosts);
        
        this.fetchThreadDetails(0);
      });
  }
  
  fetchThreadDetails(index: number) {
    if (index < this.savedPosts.length) {
      const savedPost = this.savedPosts[index];
      this.threadService.getSingleThread(savedPost.threadID)
        .subscribe((thread: Thread) => {
          savedPost.thread = thread; // Attach fetched thread details to the saved post
          this.fetchThreadDetails(index + 1); // Move to the next saved post
        });
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

  navigateToThreadReplies(threadID: number) {
    this.router.navigate([`/community/post-replies`], {
      queryParams: {
        threadID: threadID,
      },
    });
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
    const userID = sessionStorage.getItem('userID');
    this.getSavedPosts(userID);
  }

  onSortSelectionChange(event: number) {
    this.selectedSortOption = event;
    const userID = sessionStorage.getItem('userID');
    this.getSavedPosts(userID);
  }
}