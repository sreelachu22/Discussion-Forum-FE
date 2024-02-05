import { Component, Input } from '@angular/core';
import { ThreadRepliesService } from 'src/app/service/HttpServices/thread-replies.service';
import { ThreadReplies } from 'src/app/service/HttpServices/thread-replies.service';
@Component({
  selector: 'app-nested-replies',
  templateUrl: './nested-replies.component.html',
  styleUrls: ['./nested-replies.component.css']
})
export class NestedRepliesComponent {
  // @Input() replies?: ThreadReplies;
  @Input()
  nestedReply!: ThreadReplies;
}
