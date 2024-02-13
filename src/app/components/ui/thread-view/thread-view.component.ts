import { HttpParams } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import {
  Thread,
  ThreadService,
} from 'src/app/service/HttpServices/thread.service';
import { User, UserService } from 'src/app/service/HttpServices/users.service';
import {
  ThreadVote,
  VoteService,
} from 'src/app/service/HttpServices/vote.service';

@Component({
  selector: 'app-thread-view',
  templateUrl: './thread-view.component.html',
  styleUrls: ['./thread-view.component.css'],
})
export class ThreadViewComponent {
  @Input() thread?: Thread;
  @Output() upvoteEvent = new EventEmitter<ThreadVote>();
  @Output() downvoteEvent = new EventEmitter<ThreadVote>();
  ActiveUserID : string | null = sessionStorage.getItem('userID');

  constructor(
    private voteService: VoteService,
    private router: Router,
    private userService: UserService,
    private threadService: ThreadService
  ) {}

  user!: User;
  getUserName(thread: Thread) {
    this.userService.getUserByID(thread.createdBy).subscribe((data: User) => {
      this.user = data;
    });
  }
  isCurrentUser(thread: Thread): boolean {
    return this.ActiveUserID === thread.createdBy;
  }
  emitUpvote(thread: Thread) {
    //should change the vote to the person who votes
    const vote: ThreadVote = {
      userID: sessionStorage.getItem('userID'),
      threadID: thread.threadID,
      isUpVote: true,
      isDeleted: false,
    };
    this.upvoteEvent.emit(vote);
  }

  emitDownvote(thread: Thread) {
    const vote: ThreadVote = {
      userID: sessionStorage.getItem('userID'),
      threadID: thread.threadID,
      isUpVote: false,
      isDeleted: false,
    };
    this.downvoteEvent.emit(vote);
  }

  postReply(threadID: number) {
    const queryParams = {
      threadID: threadID,
    };
    this.router.navigate(['thread-replies/post-reply'], { queryParams });
  }
  editThread(threadID: number) {
    const queryParams = {
      threadID: threadID,
    };
    this.router.navigate(['category-posts/create-posts'], { queryParams });
  }
  closeThread(threadID: number) {
    const ModifierId = sessionStorage.getItem('userID') || '';
    this.threadService.closeThread(threadID, ModifierId).subscribe();
  }
  deleteThread(threadID: number) {}
  isHTML(content: string): boolean {
    const doc = new DOMParser().parseFromString(content, 'text/html');
    return Array.from(doc.body.childNodes).some((node) => node.nodeType === 1);
  }
}
