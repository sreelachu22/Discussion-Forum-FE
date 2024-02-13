import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ThreadReplies } from 'src/app/service/HttpServices/thread-replies.service';
import { VoteService } from 'src/app/service/HttpServices/vote.service';
import { Vote } from 'src/app/service/HttpServices/vote.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reply-list',
  templateUrl: './reply-list.component.html',
  styleUrls: ['./reply-list.component.css'],
})

export class ReplyListComponent {
  @Input() reply?: ThreadReplies;
  @Output() upvoteEvent = new EventEmitter<Vote>();
  @Output() downvoteEvent = new EventEmitter<Vote>();
  @Output() toggleRepliesEvent = new EventEmitter<void>();

  showReplies: { [key: number]: boolean } = {};
  ActiveUserID : string | null = sessionStorage.getItem('userID');
  constructor(private voteService: VoteService, private router: Router) {}

  emitUpvote(reply: ThreadReplies) {    
    const vote: Vote = {
      userID: sessionStorage.getItem('userID'),
      replyID: reply.replyID,
      isUpVote: true,
      isDeleted: false,
    };
    this.upvoteEvent.emit(vote);
  }

  emitDownvote(reply: ThreadReplies) {
    const vote: Vote = {
      userID: sessionStorage.getItem('userID'),
      replyID: reply.replyID,
      isUpVote: false,
      isDeleted: false,
    };
    this.downvoteEvent.emit(vote);
  }

  toggleReplies() {
    this.toggleRepliesEvent.emit();
  }

  postReply(replyID: number) {
    const queryParams = {
      replyID: replyID,
    };
    this.router.navigate(['thread-replies/post-reply'], { queryParams });
  }

  editReply(replyID: number) {
    const queryParams = {
      replyID: replyID,
    };
    this.router.navigate(['thread-replies/post-reply'], { queryParams });
  }

  isCurrentUser(reply: ThreadReplies): boolean {
    return this.ActiveUserID === reply.createdBy;
  }
  
  isHTML(content: string): boolean {
    const doc = new DOMParser().parseFromString(content, 'text/html');
    return Array.from(doc.body.childNodes).some((node) => node.nodeType === 1);
  }
}
