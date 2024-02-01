import { Component, Input } from '@angular/core';
import { ThreadReplies } from 'src/app/service/HttpServices/thread-replies.service';
export interface ThreadReplyWithVisibility extends ThreadReplies {
  showNestedReplies: boolean;
}
@Component({
  selector: 'app-thread-reply',
  templateUrl: './thread-reply.component.html',
  styleUrls: ['./thread-reply.component.css'],
})
export class ThreadReplyComponent {
  @Input() reply!: ThreadReplies;
}
