import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ThreadReplies } from 'src/app/service/HttpServices/thread-replies.service';
import { Vote } from 'src/app/service/HttpServices/vote.service';
@Component({
  selector: 'app-nested-replies',
  templateUrl: './nested-replies.component.html',
  styleUrls: ['./nested-replies.component.css']
})

export class NestedRepliesComponent {  
  @Input() nestedReply!: ThreadReplies;
  @Output() upvoteEvent = new EventEmitter<Vote>();
  @Output() downvoteEvent = new EventEmitter<Vote>();
  @Output() deleteReplyEvent = new EventEmitter<any>();

  
  handleUpvote(vote: Vote) {
    this.upvoteEvent.emit(vote);
  }

  handleDownvote(vote: Vote) {       
    this.downvoteEvent.emit(vote);
  }

  onDeleteReply(reply: ThreadReplies) {        
    this.deleteReplyEvent.emit(reply);
  }
}
