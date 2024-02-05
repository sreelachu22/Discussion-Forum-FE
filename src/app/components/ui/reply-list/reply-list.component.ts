import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ThreadReplies } from 'src/app/service/HttpServices/thread-replies.service';
import { MatIcon } from '@angular/material/icon';
import { VoteService } from 'src/app/service/HttpServices/vote.service';
import { Vote } from 'src/app/service/HttpServices/vote.service';

@Component({
  selector: 'app-reply-list',
  templateUrl: './reply-list.component.html',
  styleUrls: ['./reply-list.component.css']
})
export class ReplyListComponent {
  @Input() reply?: ThreadReplies;
  @Output() toggleRepliesEvent = new EventEmitter<void>();
  showReplies: { [key: number]: boolean } = {};
constructor(private voteService: VoteService) {}

  upvote(vote: Vote) {
    this.voteService.sendVote(vote).subscribe({
      next: (response) => {
        console.log('Vote Successful', response);
      },
      error: (error) => {
        console.error('Error sending vote', error);
      },
    });
  }

  downvote(vote: Vote) {
    this.voteService.sendVote(vote).subscribe({
      next: (response) => {
        console.log('Vote Successful', response);
      },
      error: (error) => {
        console.error('Error sending vote', error);
      },
    });  
  }  
  
  toggleReplies() {    
    this.toggleRepliesEvent.emit();
  }
}
