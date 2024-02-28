import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { SuccessPopupComponent } from 'src/app/components/ui/success-popup/success-popup.component';
import { ThreadReplies, ThreadRepliesService } from 'src/app/service/HttpServices/thread-replies.service';
import { Vote, VoteService } from 'src/app/service/HttpServices/vote.service';

@Component({
  selector: 'app-nesreplies2.0',
  templateUrl: './nesreplies2.0.component.html',
  styleUrls: ['./nesreplies2.0.component.css']
})
export class Nesreplies20Component {
  @Input() Replies!:ThreadReplies[];
  ParentID:number = 1;
  threadReplies: ThreadReplies[] = [];
  threadRepliesStatus: boolean = true;
  constructor(
    private threadRepliesService: ThreadRepliesService,
    private activateRoute: ActivatedRoute,    
    private voteService: VoteService,    
    private modalService: BsModalService
  ) {}

  ngOnInit() {
    this.loadReplies(this.ParentID);    
  }
  loadReplies(ParentID:number) {
    this.threadRepliesService
      .getReplyByParentID(ParentID)
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

  
  handleDownvote(vote: Vote) {
    this.voteService.sendVote(vote).subscribe({
      next: (response) => {},
      error: (error) => {
        console.error('Error sending downvote', error);
      },
    });
  }

}
