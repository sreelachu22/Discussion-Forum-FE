import { HttpParams } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import {
  Thread,
  ThreadService,
} from 'src/app/service/HttpServices/thread.service';
import { User, UserService } from 'src/app/service/HttpServices/users.service';
import {
  ThreadVote,
  VoteService,
} from 'src/app/service/HttpServices/vote.service';
import { SuccessPopupComponent } from '../success-popup/success-popup.component';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';

@Component({
  selector: 'app-thread-view',
  templateUrl: './thread-view.component.html',
  styleUrls: ['./thread-view.component.css'],
})
export class ThreadViewComponent {
  @Input() thread?: Thread;
  @Output() upvoteEvent = new EventEmitter<ThreadVote>();
  @Output() downvoteEvent = new EventEmitter<ThreadVote>();
  ActiveUserID: string | null = sessionStorage.getItem('userID');

  confirmModal!: BsModalRef;
  successModal!: BsModalRef;
  constructor(
    private voteService: VoteService,
    private router: Router,
    private userService: UserService,
    private threadService: ThreadService,
    private modalService: BsModalService
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
    this.router.navigate(['category-posts/edit-posts'], { queryParams });
  }

  threadID!: number;
  openCloseModal(threadID: number) {
    this.threadID = threadID;
    const initialState = {
      confirmFunction: this.confirmCloseThread.bind(this),
      declineFunction: this.declineCloseThread.bind(this),
    };
    this.confirmModal = this.modalService.show(DeleteModalComponent, {
      initialState,
    });
  }
  confirmCloseThread(): void {
    const ModifierId = sessionStorage.getItem('userID') || '';
    this.threadService.closeThread(this.threadID, ModifierId).subscribe({
      next: (response) => {
        console.log(response);
        this.successModal = this.modalService.show(SuccessPopupComponent, {
          initialState: {
            message: 'Thread closed successfully', //make use of reusable success pop up , sends message to it
          },
        });
      },
      error: (error) => {
        console.error('Error closing thread:', error);
      },
      complete: () => {
        this.router.navigate(['community']);
      },
    });
  }
  declineCloseThread() {
    this.confirmModal?.hide();
    this.successModal?.hide();
  }

  openDeleteModal(threadID: number) {
    this.threadID = threadID;
    const initialState = {
      confirmFunction: this.confirmDeleteThread.bind(this),
      declineFunction: this.declineDeleteThread.bind(this),
    };
    this.confirmModal = this.modalService.show(DeleteModalComponent, {
      initialState,
    });
  }
  confirmDeleteThread() {
    const ModifierId = sessionStorage.getItem('userID') || '';
    this.threadService.deleteThread(this.threadID, ModifierId).subscribe({
      next: (response) => {
        console.log(response);
        this.successModal = this.modalService.show(SuccessPopupComponent, {
          initialState: {
            message: 'Thread deleted successfully', //make use of reusable success pop up , sends message to it
          },
        });
      },
      error: (error) => {
        console.error('Error closing thread:', error);
      },
      complete: () => {
        this.router.navigate(['community']);
      },
    });
  }
  declineDeleteThread() {
    this.confirmModal?.hide();
    this.successModal?.hide();
  }

  isHTML(content: string): boolean {
    const doc = new DOMParser().parseFromString(content, 'text/html');
    return Array.from(doc.body.childNodes).some((node) => node.nodeType === 1);
  }
}
