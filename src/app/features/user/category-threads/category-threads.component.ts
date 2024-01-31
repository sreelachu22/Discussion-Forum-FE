import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ThreadService } from 'src/app/service/HttpServices/thread.service';

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
  CategoryThreads!: ThreadResponse;
  pages: number[] = [];
  communityCategoryMappingID!: number;
  currentPage: number = 1;
  pageSize: number = 2;
  totalPages: number = 0;

  constructor(
    private threadService: ThreadService,
    private activateRoute: ActivatedRoute,
    private router: Router
  ) {}

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
        this.currentPage, // Use currentPage for consistency
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

  formatDate(date: string | null): string {
    return date ? new Date(date).toLocaleDateString() : 'N/A';
  }

  createPost() {
    this.router.navigate(['category_threads/create_posts'], {});
  }
}
