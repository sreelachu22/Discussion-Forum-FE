import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ThreadReplies } from 'src/app/service/HttpServices/thread-replies.service';
import { Vote } from 'src/app/service/HttpServices/vote.service';
import { Router } from '@angular/router';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ReplyContentService } from 'src/app/service/DataServices/replyContent.service';
import { Thread } from 'src/app/service/HttpServices/thread.service';

@Component({
  selector: 'app-reply-list',
  templateUrl: './reply-list.component.html',
  styleUrls: ['./reply-list.component.css'],
})
export class ReplyListComponent {
  @Input() reply?: ThreadReplies;
  @Input() thread!: Thread;
  @Input() isOpenThread?: boolean;
  @Input() bestAnswerId!: number;
  @Input() upvoteSuccessEvent = new EventEmitter<{
    replyID: number;
    upvoteCount: number;
    downvoteCount: number;
  }>();
  @Input() downvoteSuccessEvent = new EventEmitter<{
    replyID: number;
    downvoteCount: number;
    upvoteCount: number;
  }>();

  @Output() upvoteEvent = new EventEmitter<Vote>();
  @Output() downvoteEvent = new EventEmitter<Vote>();
  @Output() toggleRepliesEvent = new EventEmitter<void>();
  @Output() deleteReplyEvent = new EventEmitter<any>();
  @Output() markAsBestAnswerEvent = new EventEmitter<number>();
  @Output() unmarkAsBestAnswerEvent = new EventEmitter<number>();

  showReplies: { [key: number]: boolean } = {};
  ActiveUserID: string | null = sessionStorage.getItem('userID');
  //modalService: any;
  confirmModal!: BsModalRef;
  userID: string | null = sessionStorage.getItem('userID');

  constructor(
    private router: Router,
    private modalService: BsModalService,
    private replyContentService: ReplyContentService
  ) {}

  ngOnInit() {
    this.upvoteSuccessEvent.subscribe(
      (emittedData: {
        replyID: number;
        upvoteCount: number;
        downvoteCount: number;
      }) => {
        if (this.reply && this.reply.replyID === emittedData.replyID) {
          this.reply.upvoteCount = emittedData.upvoteCount;
          this.reply.downvoteCount = emittedData.downvoteCount;
        }
      }
    );
    this.downvoteSuccessEvent.subscribe(
      (emittedData: {
        replyID: number;
        downvoteCount: number;
        upvoteCount: number;
      }) => {
        if (this.reply && this.reply.replyID === emittedData.replyID) {
          this.reply.downvoteCount = emittedData.downvoteCount;
          this.reply.upvoteCount = emittedData.upvoteCount;
        }
      }
    );
  }

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

  editReply(reply: ThreadReplies) {
    this.replyContentService.setContent(reply.content);
    const queryParams = {
      replyID: reply.replyID,
    };
    this.router.navigate(['thread-replies/edit-reply'], { queryParams });
  }

  openDeleteModal(reply: ThreadReplies) {
    this.reply = reply;
    const initialState = {
      confirmFunction: this.confirmDeleteReply.bind(this),
      declineFunction: this.declineDeleteReply.bind(this),
    };
    if (reply) {
      this.confirmModal = this.modalService.show(DeleteModalComponent, {
        initialState,
      });
    }
  }

  confirmDeleteReply() {
    this.deleteReplyEvent.emit(this.reply);
  }

  declineDeleteReply() {
    this.confirmModal?.hide();
  }

  isCurrentUser(reply: ThreadReplies): boolean {
    return this.ActiveUserID === reply.createdBy;
  }

  isThreadCreator(thread: Thread): boolean {
    return this.ActiveUserID === thread.createdBy;
  }

  markAsBestAnswer(replyID: number) {
    this.markAsBestAnswerEvent.emit(replyID);
  }

  unmarkAsBestAnswer(replyID: number) {
    this.unmarkAsBestAnswerEvent.emit(replyID);
  }

  isHTML(content: string): boolean {
    const doc = new DOMParser().parseFromString(content, 'text/html');
    return Array.from(doc.body.childNodes).some((node) => node.nodeType === 1);
  }
}
