import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  content: string;
  createdBy: string;
  createdAt: string;
  modifiedBy: string;
  modifiedAt: string;
  threadStatusName: string;
  isAnswered: boolean;
  voteCount: number;
  tagNames: string[];
}

@Component({
  selector: 'app-category-threads',
  templateUrl: './category-threads.component.html',
  styleUrls: ['./category-threads.component.css'],
})
export class CategoryThreadsComponent implements OnInit {
  // templete variables
  CategoryThreads!: ThreadResponse;
  pages: number[] = [];
  communityCategoryMappingID!: number;
  currentPage: number = 1;
  pageSize: number = 3;
  totalPages: number = 0;
  creatorId!: string;

  constructor(
    private threadService: ThreadService,
    private activateRoute: ActivatedRoute,
    private router: Router,
  ) {}

  // ng init with method to get url params and display content based on it
  ngOnInit() {
    this.activateRoute.queryParams.subscribe((params) => {
      this.communityCategoryMappingID = params['communityCategoryMappingID'];
    });

    this.loadThreads();
  }

  loadThreads() {
    this.threadService
      .getThread(
        this.communityCategoryMappingID,
        this.currentPage,
        this.pageSize
      )
      .subscribe({
        next: (data: ThreadResponse) => {
          this.CategoryThreads = data;
          this.totalPages = Math.ceil(
            this.CategoryThreads.totalCount / this.pageSize
          ); // Calculate totalPages
          this.updatePageNumbers();
        },
        error: (error: Error) => {
          console.log('Error', error);
        },
      });
  }

  // paginations logics
  updatePageNumbers() {
    const pagesToShow = Math.min(this.totalPages, 3);
    const startPage = Math.max(1, this.currentPage - 1);
    const endPage = Math.min(this.totalPages, startPage + pagesToShow - 1);

    this.pages = Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    );
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadThreads();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadThreads();
    }
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadThreads();
    }
  }

  // user friendly data format
  formatDate(date: string | null): string {
    return date ? new Date(date).toLocaleDateString() : 'N/A';
  }

  // create a post
  createPost() {
    const queryParams = {
      communityCategoryMappingID: this.communityCategoryMappingID,
      creatorId: this.creatorId || '636544A4-6255-478C-A8E8-DAEE14E90074', // Replace this with the actual creatorId
    };

    this.router.navigate(['category_threads/create_posts'], { queryParams });

  };
    // const queryParams = {
    //   communityCategoryMappingID: this.communityCategoryMappingID,
    //   creatorId: this.creatorId || '636544A4-6255-478C-A8E8-DAEE14E90074',
    //   heading: 'Create Post',
    //   firstButtonName: 'Posts',
    //   secondButtonName: 'Cancel',
      // onFirstButtonClick: ,
      // onSecondButtonClick: ,
      // Add other data as needed
  
  
    // this.router.navigate(['category_threads/create_posts'], { queryParams });

  navigateToThreadReplies(threadID: number) {
    this.router.navigate(['/thread-replies'], {
      queryParams: { threadID: threadID },
    });
  }

  searchTerm: string = '';
  searchResult(searchTerm: string) {
    this.router.navigate(['/search-result'], {
      queryParams: { searchTerm: this.searchTerm },
    });
  }

  changePage(newPage: number) {
    if (newPage >= 1 && newPage <= this.totalPages) {
      this.currentPage = newPage;
      this.loadThreads();
    }
  }
}
