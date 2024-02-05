import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ThreadReplies } from 'src/app/service/HttpServices/thread-replies.service';
import { MatIcon } from '@angular/material/icon';
@Component({
  selector: 'app-reply-list',
  templateUrl: './reply-list.component.html',
  styleUrls: ['./reply-list.component.css']
})
export class ReplyListComponent {
  @Input() reply?: ThreadReplies;
  @Output() toggleRepliesEvent = new EventEmitter<void>();
  showReplies: { [key: number]: boolean } = {};
  upvote() {
    window.alert("upvoted");
  }

  downvote() {
    window.alert("downvoted");
  }  
  toggleReplies() {    
    this.toggleRepliesEvent.emit();
  }
}
