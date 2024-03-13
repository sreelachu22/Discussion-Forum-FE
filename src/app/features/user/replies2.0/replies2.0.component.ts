import { Component, EventEmitter, Output } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { SuccessPopupComponent } from 'src/app/components/ui/success-popup/success-popup.component';
import { ThreadRepliesService, ThreadReplies } from 'src/app/service/HttpServices/thread-replies.service';
import { VoteService, Vote} from 'src/app/service/HttpServices/vote.service';

// interface ThreadReplyWithParent {
//   reply: ThreadReplies;
//   parentReply: number | string;
//   reply_index:number;
// }

@Component({
  selector: 'app-replies2.0',
  templateUrl: './replies2.0.component.html',
  styleUrls: ['./replies2.0.component.css']
})

export class Replies20Component {
//   bsModalRef: any;
//   threadID: any;
//   router: any;

//   @Output() upvoteSuccessEvent = new EventEmitter<{ replyID: number, upvoteCount: number, downvoteCount:number }>();
//   @Output()  downvoteSuccessEvent = new EventEmitter<{ replyID: number, downvoteCount: number, upvoteCount: number }>();

//   constructor(
//     private threadRepliesService: ThreadRepliesService,  
//     private voteService: VoteService,    
//     private modalService: BsModalService
//   ) {}

//   threadId: number = 65 ;
//   parent_replyID: number | string = "";
//   searchTerm: string = '';
//   threadReplies: ThreadReplyWithParent[] = [];
//   showNestedReplies: boolean[] = [];    
//   threadRepliesStatus: boolean = true;
//   isOpenThread: boolean = true;
//   isLoading = false;
//   currentObject!:ThreadReplyWithParent;
  
//   ngOnInit() {
//     this.loadReplies();    
//   }

//   handleUpvote(event: Vote) {
//   const vote = event;
//   this.voteService.sendVote(vote).subscribe({
//     next: (response) => {
//       const data = response;
//       const eventData = { replyID: data.replyID, upvoteCount: data.upvoteCount, downvoteCount: data.downvoteCount };
//       this.upvoteSuccessEvent.emit(eventData);
//     },
//     error: (error) => {
//       console.log(error);
//     },
//   });
// }


//   handleDownvote(event: Vote) {
//     const  vote  = event;
//     this.voteService.sendVote(vote).subscribe({
//       next: (response) => {        
//         const data = response;
//       const eventData = { replyID: data.replyID, downvoteCount: data.downvoteCount, upvoteCount: data.upvoteCount };
//       this.downvoteSuccessEvent.emit(eventData);     
//       },
//       error: (error) => {      
//         console.log(error)              
//       },
//     });
//   }

  

//   get sortedReplies(): any[] {
//     // Sort threadReplies based on reply_index
//     return this.threadReplies.slice().sort((a, b) => a.reply_index - b.reply_index);
//   }  

//   loadReplies() {
//     let position = 0;    
//     this.threadRepliesService
//       .getReplyByParentID(this.threadId, this.parent_replyID)
//       .subscribe({
//         next: (repliesData: any) => {
//           // Iterate over each reply in the repliesData array
//           this.threadReplies = repliesData.map((reply: any) => {            
//             return {         
//               reply: reply,
//               parentReply: reply.parentReplyID,
//               reply_index:position++
//             };                    
//           });          
//           this.threadRepliesStatus = true;          
//         },
//         error: (error: Error) => {
//           console.log('Error', error);
//           this.threadRepliesStatus = false;
//         },
//       });
//   }
//   toggleNestedReplies(index: number) {
//     if (!this.showNestedReplies[index]) {      
//       this.showNestedReplies[index] = true;
//       // Load nested replies and then remove them from threadReplies
//       this.loadNestedReplies(index);
      
//     } else {
//       // Recursive function to remove nested replies
//       const removeNestedReplies = (startIndex: number) => {
//         let endIndex = startIndex + 1;
//         while (endIndex < this.threadReplies.length && this.threadReplies[endIndex].reply.parentReplyID === this.threadReplies[startIndex].reply.replyID) {
//           removeNestedReplies(endIndex); // Recursively remove child replies
//           endIndex++;
//         }
//         this.threadReplies.splice(startIndex + 1, endIndex - startIndex - 1); // Remove child replies
//         // Set showNestedReplies to false for all removed replies
//         for (let i = startIndex + 1; i < endIndex; i++) {
//           this.showNestedReplies[i] = false;
//         }
//       };  
//       // Find the index range of child replies in threadReplies array
//       const startIndex = index;
//       removeNestedReplies(startIndex);
  
//       // Update showNestedReplies flag for the toggled reply
//       this.showNestedReplies[index] = false;
//       console.log(this.threadReplies);
//     }
//   }
//   loadNestedReplies(index: number) {
//     const parentReplyId = this.threadReplies[index].reply.replyID;

//     this.threadRepliesService
//       .getReplyByParentID(this.threadId, parentReplyId)
//       .subscribe(
//         (repliesData:any) => {
//           let position = 1; // Start position from 1 to place nested replies right after the parent
//           const insertIndex = index + 1; // Calculate the index where the nested replies will be inserted
          
//           // Filter out replies that already exist in threadReplies
//           const newReplies: any[] = repliesData.filter((reply: any) => {
//             return !this.threadReplies.some(existingReply => existingReply.reply.replyID === reply.replyID);
//           });

//           // Map new replies to ThreadReplyWithParent format
//           const nestedReplies: ThreadReplyWithParent[] = newReplies.map((reply: any) => {            
//             return {         
//               reply: reply,
//               parentReply: reply.parentReplyID,
//               reply_index: this.threadReplies[index].reply_index + position++
//             };                    
//           });

//           // Update the indices of replies that were previously at the insertion position
//           for (let i = insertIndex; i < this.threadReplies.length; i++) {
//             this.threadReplies[i].reply_index += newReplies.length;
//           }

//           // Insert nested replies at the specified position
//           this.threadReplies.splice(insertIndex, 0, ...nestedReplies);
//         },
//         (error: Error) => {
//           console.log('Error loading nested replies', error);
//         }
//       );
//   }

//   getDepthLevel(reply: ThreadReplyWithParent): number {
//     let depth = 0;
//     let parentReplyId = reply.reply.parentReplyID;

//     while (parentReplyId !== "") {
//       depth++;
//       const parentReply = this.threadReplies.find(r => r.reply.replyID === parentReplyId);
//       if (parentReply) {
//         parentReplyId = parentReply.reply.parentReplyID;
//       } else {
//         break;
//       }
//     }
//     return depth;
//   }
  
//   onDeleteReply(reply: ThreadReplies) {
//     this.threadRepliesService
//       .deleteReply(reply.replyID, reply.createdBy)
//       .subscribe({
//         next: () => {
//           this.onSubmit(reply);
//         },
//         error: (error) => {
//           console.error('Error deleting reply:', error);
//         },
//       });
//   }  

//   onSubmit(reply: ThreadReplies) {
//     const content = '-reply deleted by user-';
//     this.threadRepliesService
//       .editReply(reply.replyID, reply.createdBy, content)
//       .subscribe({
//         next: (response) => {
//           this.bsModalRef = this.modalService.show(SuccessPopupComponent, {
//             initialState: {
//               message: 'Reply deleted successfully',
//             },
//           });
//         },
//         error: (error) => {
//           console.error('Error deleting reply:', error);
//         },
//         complete: () => {
//           this.loadReplies();
//         },
//       });
//   }
  
}
