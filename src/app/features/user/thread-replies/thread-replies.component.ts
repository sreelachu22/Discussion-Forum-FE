import { Component, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { forkJoin, switchMap } from 'rxjs';
import { SuccessPopupComponent } from 'src/app/components/ui/success-popup/success-popup.component';
import { LoaderService } from 'src/app/service/HttpServices/loader.service';
import { searchService } from 'src/app/service/HttpServices/search.service';
import {
  ThreadReplies,
  ThreadRepliesService,
} from 'src/app/service/HttpServices/thread-replies.service';
import {
  Thread,
  ThreadService,
} from 'src/app/service/HttpServices/thread.service';
import {
  ThreadVote,
  Vote,
  VoteService,
} from 'src/app/service/HttpServices/vote.service';

@Component({
  selector: 'app-thread-replies',
  templateUrl: './thread-replies.component.html',
  styleUrls: ['./thread-replies.component.css'],
})
export class ThreadRepliesComponent {
  bsModalRef: any;  
  threadID: any;
  router: any;
  constructor(
    private threadRepliesService: ThreadRepliesService,
    private searchService: searchService,
    private activateRoute: ActivatedRoute,
    private threadService: ThreadService,
    private voteService: VoteService,
    private loaderService: LoaderService,
    private modalService: BsModalService,
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
  showNestedReplies: boolean[] = [];
  thread!: Thread;

  isLoading = false;
  ngOnInit() {
    this.loadThread();
    this.loaderService.isLoading$.subscribe((isLoading) => {
      this.isLoading = isLoading;
    });
  }

  loadThread() {
    this.activateRoute.queryParams
      .pipe(
        switchMap((params) => {
          this.threadId = params['threadID'];
          return this.threadService.getSingleThread(this.threadId);
        })
      )
      .subscribe((data: any) => {
        this.thread = data;
        console.log(data);
        this.loadReplies();
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

  onDeleteReply(reply: ThreadReplies) {    
    this.threadRepliesService.deleteReply(reply.replyID, reply.createdBy).subscribe({
      next: () => {
        console.log('Reply deleted successfully');  
        this.onSubmit(reply)   
      },
      error: (error) => {
        console.error('Error deleting reply:', error);        
      }
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
        this.loadThread();
      },
    });
  }

  handleThreadUpvote(vote: ThreadVote) {
    this.voteService.sendThreadVote(vote).subscribe({
      next: (response) => {
        console.log('Upvote Successful', response);
      },
      error: (error) => {
        console.error('Error sending upvote', error);
        this.loadThread();
      },
    });
  }
  handleThreadDownvote(vote: ThreadVote) {
    this.voteService.sendThreadVote(vote).subscribe({
      next: (response) => {
        console.log('Downvote Successful', response);
      },
      error: (error) => {
        console.error('Error sending downvote', error);
        this.loadThread();
      },
    });
  }

  onSubmit(reply:ThreadReplies) {   
    const content = "-reply deleted by user-"
    this.threadRepliesService.editReply(reply.replyID, reply.createdBy, content)
      .subscribe({
        next: (response) => {          
          this.bsModalRef = this.modalService.show(SuccessPopupComponent, {
            initialState: {
              message: 'Reply deleted successfully',
            },
          });
        },
        error: (error) => {
          console.error('Error deleting reply:', error);
        },
        complete: () => {
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
