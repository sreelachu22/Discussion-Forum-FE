import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  ThreadReplies,
  ThreadRepliesService,
} from 'src/app/service/HttpServices/thread-replies.service';
import { VoteService } from 'src/app/service/HttpServices/vote.service';
import { Vote } from 'src/app/service/HttpServices/vote.service';
import { Router } from '@angular/router';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-reply-list',
  templateUrl: './reply-list.component.html',
  styleUrls: ['./reply-list.component.css'],
})
export class ReplyListComponent {
  @Input() reply?: ThreadReplies;
  @Input() isOpenThread?: boolean;
  @Output() upvoteEvent = new EventEmitter<Vote>();
  @Output() downvoteEvent = new EventEmitter<Vote>();
  @Output() toggleRepliesEvent = new EventEmitter<void>();
  @Output() deleteReplyEvent = new EventEmitter<any>();

  showReplies: { [key: number]: boolean } = {};
  ActiveUserID: string | null = sessionStorage.getItem('userID');  
  modalService: any;
  confirmModal!: BsModalRef;

  constructor(
    private voteService: VoteService,
    private router: Router,
    private threadRepliesService: ThreadRepliesService,    
  ) {}

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
    this.router.navigate(['thread-replies/edit-reply'], { queryParams });
  }

  openDeleteModal(reply: ThreadReplies) {
    this.reply = reply;
    const initialState = {
      confirmFunction: this.confirmDeleteReply.bind(this),
      declineFunction: this.declineDeleteReply.bind(this),
    };
    this.confirmModal = this.modalService.show(DeleteModalComponent, {
      initialState,
    });
  }
  confirmDeleteReply() {
    this.deleteReplyEvent.emit(this.reply);
  }
  declineDeleteReply() {
    this.confirmModal?.hide();
  }

  deleteReply(reply: ThreadReplies) {}

  isCurrentUser(reply: ThreadReplies): boolean {
    return this.ActiveUserID === reply.createdBy;
  }

  isHTML(content: string): boolean {
    const doc = new DOMParser().parseFromString(content, 'text/html');
    return Array.from(doc.body.childNodes).some((node) => node.nodeType === 1);
  }
}
