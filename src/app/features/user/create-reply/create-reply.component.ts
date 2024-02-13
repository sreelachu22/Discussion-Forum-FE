import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { SuccessPopupComponent } from 'src/app/components/ui/success-popup/success-popup.component';
import { ThreadRepliesService } from 'src/app/service/HttpServices/thread-replies.service';
import { ThreadService } from 'src/app/service/HttpServices/thread.service';

@Component({
  selector: 'app-create-reply',
  templateUrl: './create-reply.component.html',
  styleUrls: ['./create-reply.component.css'],
})
export class CreateReplyComponent implements OnInit {
  reply: any;
  thread: any;
  replyID!: number;
  replyUser!: string;
  threadOwnerEmail!: string;
  replyContent!: string;
  threadID!: number;
  parentReplyID!: number;
  replyData: { name: string; value: any; isHtml?: boolean }[] = [];
  justifyPosition: string = 'flex-start';
  bsModalRef!: BsModalRef;
  postBaseURL: string = 'https://localhost:7160/api/Reply';
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private threadRepliesService: ThreadRepliesService,
    private http: HttpClient,
    private modalService: BsModalService,
    private renderer: Renderer2,
    private threadService: ThreadService
  ) {}

  ngOnInit(): void {
    if (this.route.snapshot.queryParams['threadID']) {
      this.threadID = this.route.snapshot.queryParams['threadID'];
      this.threadService.getSingleThread(this.threadID).subscribe((data) => {
        console.log(data);
        this.thread = data;
        this.replyData.push(
          { name: '', value: this.thread.title, isHtml: true },
          { name: '', value: this.thread.content, isHtml: true }
        );
      });
    } else {
      this.replyID = +this.route.snapshot.queryParams['replyID'];
      this.threadRepliesService.getReplyByID(this.replyID).subscribe((data) => {
        this.reply = data[0];
        this.replyContent = this.reply.content;
        this.threadID = this.reply.threadID;
        this.parentReplyID = this.reply.replyID;
        this.threadOwnerEmail = this.reply.threadOwnerEmail;

        // Add the user and content to replyData
        this.replyData.push({
          name: '',
          value: this.replyContent,
          isHtml: true,
        });
      });
    }
  }
  onSubmit(content: any) {
    console.log(content.editorContent);
    if (this.parentReplyID) {
      this.postBaseURL = `${this.postBaseURL}/${
        this.threadID
      }?creatorId=${sessionStorage.getItem('userID')}&parentReplyId=${
        this.replyID
      }`;
    } else {
      this.postBaseURL = `${this.postBaseURL}/${
        this.threadID
      }?creatorId=${sessionStorage.getItem('userID')}`;
    }
    this.http
      .post(this.postBaseURL, JSON.stringify(content.editorContent), {
        headers: {
          'Content-Type': 'application/json',
          Accept: '*/*',
        },
      })
      .subscribe({
        next: (response) => {
          console.log('Reply posted successfully:', response);
          // Show success message
          this.bsModalRef = this.modalService.show(SuccessPopupComponent, {
            initialState: {
              message: 'Reply posted successfully', //make use of reusable success pop up , sends message to it
            },
          });
        },
        error: (error) => {
          console.error('Error creating thread:', error);
        },
        complete: () => {
          const queryParams = {
            threadID: this.threadID,
          };
          this.router.navigate(['community', 'post-replies'], {
            queryParams: queryParams,
          });
        },
      });
  }

  goBack() {
    const queryParams = {
      threadID: this.threadID,
    };
    this.router.navigate(['community', 'post-replies'], {
      queryParams: queryParams,
    });
  }
  isHTML(content: string): boolean {
    const doc = new DOMParser().parseFromString(content, 'text/html');
    return Array.from(doc.body.childNodes).some((node) => node.nodeType === 1);
  }
}
