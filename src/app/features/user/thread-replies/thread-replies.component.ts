import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { switchMap } from 'rxjs';
import { SuccessPopupComponent } from 'src/app/components/ui/success-popup/success-popup.component';
import { LoaderService } from 'src/app/service/HttpServices/loader.service';
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
    private activateRoute: ActivatedRoute,
    private threadService: ThreadService,
    private voteService: VoteService,
    private loaderService: LoaderService,
    private modalService: BsModalService
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
  threadRepliesStatus: boolean = true;

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
        this.loadReplies();
      });
  }

  loadReplies() {
    this.threadRepliesService
      .getRepliesOfThread(this.threadId, this.parent_replyID, 1, 20)
      .subscribe({
        next: (repliesData: any) => {
          this.threadReplies = repliesData;
          this.threadRepliesStatus = true;
        },
        error: (error: Error) => {
          console.log('Error', error);
          this.threadRepliesStatus = false;
        },
      });
  }

  onDeleteReply(reply: ThreadReplies) {
    this.threadRepliesService
      .deleteReply(reply.replyID, reply.createdBy)
      .subscribe({
        next: () => {
          this.onSubmit(reply);
        },
        error: (error) => {
          console.error('Error deleting reply:', error);
        },
      });
  }

  toggleNestedReplies(index: number) {
    this.showNestedReplies[index] = !this.showNestedReplies[index];
  }

  handleUpvote(vote: Vote) {
    this.voteService.sendVote(vote).subscribe({
      next: (response) => {},
      error: (error) => {
        console.error('Error sending upvote', error);
        this.loadReplies();
      },
    });
  }

  handleDownvote(vote: Vote) {
    this.voteService.sendVote(vote).subscribe({
      next: (response) => {},
      error: (error) => {
        console.error('Error sending downvote', error);
        this.loadThread();
      },
    });
  }

  handleThreadUpvote(vote: ThreadVote) {
    this.voteService.sendThreadVote(vote).subscribe({
      next: (response) => {},
      error: (error) => {
        console.error('Error sending upvote', error);
        this.loadThread();
      },
    });
  }

  handleThreadDownvote(vote: ThreadVote) {
    this.voteService.sendThreadVote(vote).subscribe({
      next: (response) => {},
      error: (error) => {
        console.error('Error sending downvote', error);
        this.loadThread();
      },
    });
  }

  onSubmit(reply: ThreadReplies) {
    const content = '-reply deleted by user-';
    this.threadRepliesService
      .editReply(reply.replyID, reply.createdBy, content)
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
}
