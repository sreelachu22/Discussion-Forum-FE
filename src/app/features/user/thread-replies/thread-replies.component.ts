import { Component, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin, switchMap } from 'rxjs';
import { LoaderService } from 'src/app/service/HttpServices/loader.service';
import { searchService } from 'src/app/service/HttpServices/search.service';
import {
  ThreadReplies,
  ThreadRepliesService,
} from 'src/app/service/HttpServices/thread-replies.service';
import { ThreadService } from 'src/app/service/HttpServices/thread.service';
import { Vote, VoteService } from 'src/app/service/HttpServices/vote.service';

@Component({
  selector: 'app-thread-replies',
  templateUrl: './thread-replies.component.html',
  styleUrls: ['./thread-replies.component.css'],
})
export class ThreadRepliesComponent {
  constructor(
    private threadRepliesService: ThreadRepliesService,
    private searchService: searchService,
    private activateRoute: ActivatedRoute,
    private threadService: ThreadService,
    private voteService: VoteService,
    private loaderService: LoaderService
  ) {}

  breadcrumbs = [
    { label: 'Home', route: '/home' },
    { label: 'Community', route: '/community' },
    { label: 'Category', route: '/community/category-posts' },
    { label: 'Post', route: '/community/post-replies' },
  ];
  threadId: number = 0;
  parent_replyID: number | string = '';
  searchTerm: string = '';
  threadReplies: ThreadReplies[] = [];
  // showReplies: { [key: number]: boolean } = {};
  showNestedReplies: boolean[] = [];
  threadInfo: any;
  threadData: { name: string; value: any }[] = [];
  threadTitle!: string;
  threadContent!: string;

  isLoading = false;
  ngOnInit() {
    this.activateRoute.queryParams
      .pipe(
        switchMap((params) => {
          this.threadId = params['threadID'];
          return this.threadService.getSingleThread(this.threadId);
        })
      )
      .subscribe((data: any) => {
        this.threadInfo = data;
        this.threadTitle = this.threadInfo.title;
        this.threadContent = this.threadInfo.content;
        this.threadData.push(
          { name: '', value: this.threadTitle },
          { name: '', value: this.threadContent }
        );
        this.loadReplies();
      });
    this.loaderService.isLoading$.subscribe((isLoading) => {
      this.isLoading = isLoading;
    });
  }

  loadReplies() {
    this.threadRepliesService
      .getRepliesOfThread(this.threadId, this.parent_replyID, 1, 10)
      .subscribe({
        next: (repliesData: any) => {
          this.threadReplies = repliesData;
          console.log(repliesData);
        },
        error: (error: Error) => {
          console.log('Error', error);
        },
      });
  }

  toggleNestedReplies(index: number) {
    this.showNestedReplies[index] = !this.showNestedReplies[index];
  }
  handleUpvote(vote: Vote) {
    this.voteService.sendVote(vote).subscribe({
      next: (response) => {
        console.log('Upvote Successful', response);
      },
      error: (error) => {
        console.error('Error sending upvote', error);
        this.loadReplies();
      },
    });
  }
  handleDownvote(vote: Vote) {
    this.voteService.sendVote(vote).subscribe({
      next: (response) => {
        console.log('Downvote Successful', response);
      },
      error: (error) => {
        console.error('Error sending downvote', error);
        this.loadReplies();
      },
    });
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
