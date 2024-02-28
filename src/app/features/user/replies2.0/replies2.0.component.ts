import { Component } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { SuccessPopupComponent } from 'src/app/components/ui/success-popup/success-popup.component';
import { ThreadRepliesService, ThreadReplies } from 'src/app/service/HttpServices/thread-replies.service';
import { VoteService, Vote} from 'src/app/service/HttpServices/vote.service';

@Component({
  selector: 'app-replies2.0',
  templateUrl: './replies2.0.component.html',
  styleUrls: ['./replies2.0.component.css']
})
export class Replies20Component {
  bsModalRef: any;
  threadID: any;
  router: any;

  constructor(
    private threadRepliesService: ThreadRepliesService,  
    private voteService: VoteService,    
    private modalService: BsModalService
  ) {}


  threadId: number = 1  ;
  parent_replyID: number | string = '';
  searchTerm: string = '';
  threadReplies: ThreadReplies[] = [];
  showNestedReplies: boolean[] = [];    
  threadRepliesStatus: boolean = true;
 isOpenThread: boolean = true;
  isLoading = false;
  
  ngOnInit() {
    this.loadReplies();    
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

  toggleNestedReplies(index: number) {
    this.showNestedReplies[index] = !this.showNestedReplies[index];
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
