// thread-reply.model.ts
import { ThreadReplies } from 'src/app/service/HttpServices/thread-replies.service';

export interface ThreadReplyWithVisibility extends ThreadReplies {
  showNestedReplies: boolean;
}
