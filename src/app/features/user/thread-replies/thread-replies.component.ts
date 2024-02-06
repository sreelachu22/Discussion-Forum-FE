import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { searchService } from 'src/app/service/HttpServices/search.service';
import {
  ThreadReplies,
  ThreadRepliesService,
} from 'src/app/service/HttpServices/thread-replies.service';

@Component({
  selector: 'app-thread-replies',
  templateUrl: './thread-replies.component.html',
  styleUrls: ['./thread-replies.component.css'],
})
export class ThreadRepliesComponent {
  constructor(
    private threadRepliesService: ThreadRepliesService,
    private searchService: searchService,
    private activateRoute: ActivatedRoute
  ) {}

  breadcrumbs = [
    { label: 'Home', route: '/home_page' },
    { label: 'Community', route: '/community_page' },
    { label: 'Category', route: '/category-threads' },
    { label: 'Post', route: '/thread-replies' },
  ];
  threadId: number = 0;
  parent_replyID: number | string = '';
  searchTerm: string = '';
  threadReplies: ThreadReplies[] = [];
  // showReplies: { [key: number]: boolean } = {};
  showNestedReplies: boolean[] = [];
  ngOnInit() {
    this.activateRoute.queryParams.subscribe((params) => {
      this.threadId = params['threadID'];
    });

    this.threadRepliesService
      .getRepliesOfThread(this.threadId, this.parent_replyID, 1, 10)
      .subscribe({
        next: (data: any) => {
          this.threadReplies = data;
        },
        error: (error: Error) => {
          console.log('Error', error);
        },
      });
  }
  toggleNestedReplies(index: number) {
    this.showNestedReplies[index] = !this.showNestedReplies[index];
  }

  // search the entered term and showing it in a modal - temporary.
  // In actual implementation search results will pass
  searchReplies: ThreadReplies[] = [];
  searchResult(searchTerm: string) {
    if (searchTerm) {
      this.searchService.searchReplies(searchTerm).subscribe({
        next: (results: ThreadReplies[]) => {
          this.searchReplies = results;
          // Extract reply IDs from search results
          const replyIds = this.searchReplies.map((reply) => reply.replyID);

          // Call getReplyByID for each reply ID
          const requests = replyIds.map((replyId) =>
            this.threadRepliesService.getReplyByID(replyId)
          );

          // forkJoin to handle multiple parallel requests
          forkJoin(requests).subscribe({
            next: (repliesData: any[]) => {
              this.threadReplies = repliesData;
            },
            error: (error: Error) => {
              console.log('Error fetching replies by ID:', error);
            },
            complete: () => {
              console.log('Completed');
            },
          });
        },
        error: (error: Error) => {
          alert('Error has occurred, ' + error.message);
        },
        complete: () => {
          console.log('Completed');
        },
      });
    }
  }
}
