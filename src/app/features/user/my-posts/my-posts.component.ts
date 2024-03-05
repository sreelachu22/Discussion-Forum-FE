import { Component, ElementRef, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryMappingService } from 'src/app/service/DataServices/category-mapping.service';
import { CommunityDataService } from 'src/app/service/DataServices/community-data.service';
import { LoaderService } from 'src/app/service/HttpServices/loader.service';
import { ThreadService } from 'src/app/service/HttpServices/thread.service';

// interface for response data
interface ThreadResponse {
  threads: Thread[];
  totalCount: number;
  categoryName: string;
  categoryDescription: string;
  pageSize: number;
  currentPage: number;
  totalPages: number;
}

interface Thread {
  threadID: number;
  title: string;
  content: string;
  createdByUser: string;
  createdAt: string;
  modifiedByUser: string;
  modifiedAt: string;
  threadStatusName: string;
  isAnswered: boolean;
  upVoteCount: number;
  downVoteCount: number;
  tagNames: string[];
  replyCount: number;
}

@Component({
  selector: 'app-my-posts',
  templateUrl: './my-posts.component.html',
  styleUrls: ['./my-posts.component.css'],
})
export class MyPostsComponent {
  CategoryThreads!: ThreadResponse;
  communityCategoryMappingID!: number;
  communityID!: number;
  currentPage: number = 1;
  pageSize: number = 10;
  totalPages: number = 0;
  creatorId!: string;

  breadcrumbs = [
    { label: 'Home', route: '/home' },
    {
      label: 'My Posts',
      route: '/my-posts',
    },
  ];

  constructor(
    private threadService: ThreadService,
    private activateRoute: ActivatedRoute,
    private router: Router,
    private loaderService: LoaderService,
    private communityDataService: CommunityDataService,
    private categoryMappingService: CategoryMappingService,
    private el: ElementRef,
    private renderer: Renderer2
  ) {}

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

  userID: string | null = '';
  isLoading = false;
  // ng init with method to get url params and display content based on it

  ngOnInit() {
    this.loaderService.isLoading$.subscribe((isLoading) => {
      this.isLoading = isLoading;
    });
    this.communityDataService.communityID$.subscribe((id) => {
      this.communityID = id;
    });
    this.categoryMappingService.communityCategoryMappingID$.subscribe((id) => {
      this.communityCategoryMappingID = id;
    });
    this.userID = sessionStorage.getItem('userID');
    this.loadMyThreads();
  }

  ngAfterViewInit() {
    this.applyStylesToElementByClassName('tags');
  }

  loadMyThreads() {
    this.threadService
      .getMyThreads(
        this.userID,
        this.currentPage,
        this.pageSize,
        this.selectedFilterOption,
        this.selectedSortOption
      )
      .subscribe({
        next: (data: ThreadResponse) => {
          this.CategoryThreads = data;
          this.totalPages = Math.ceil(
            this.CategoryThreads.totalCount / this.pageSize
          );
        },
        error: (error: Error) => {
          console.log('Error', error);
        },
      });
  }

  // paginations logics

  changePage(newPage: number) {
    if (newPage >= 1 && newPage <= this.totalPages) {
      this.currentPage = newPage;
      this.loadMyThreads();
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

  // create a post
  createPost() {
    const queryParams = {
      creatorId: this.creatorId || sessionStorage.getItem('userID'), // Replace this with the actual creatorId
    };

    this.router.navigate(['/category-posts/create-posts'], {
      queryParams,
    });
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
    this.loadMyThreads();
  }

  onSortSelectionChange(event: number) {
    this.selectedSortOption = event;
    this.loadMyThreads();
  }
}
