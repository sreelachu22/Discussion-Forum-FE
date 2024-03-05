import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { InvalidPopupComponent } from 'src/app/components/ui/invalid-popup/invalid-popup.component';
import { SuccessPopupComponent } from 'src/app/components/ui/success-popup/success-popup.component';
import { environment } from 'src/app/environments/environment';
import { LoaderService } from 'src/app/service/HttpServices/loader.service';
import { ThreadRepliesService } from 'src/app/service/HttpServices/thread-replies.service';
import { ThreadService } from 'src/app/service/HttpServices/thread.service';
export interface EmailModel {
  toEmail: string;
  subject: string;
  body: string;
}
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
  baseUrl: string = environment.apiUrl;
  postBaseURL: string = this.baseUrl + 'Reply';
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private threadRepliesService: ThreadRepliesService,
    private http: HttpClient,
    private modalService: BsModalService,
    private threadService: ThreadService,
    private loaderService: LoaderService
  ) {}

  isLoading: boolean = false;
  alertRef?: BsModalRef;

  ngOnInit(): void {
    this.loaderService.isLoading$.subscribe((isLoading) => {
      this.isLoading = isLoading;
    });
    if (this.route.snapshot.queryParams['threadID']) {
      this.threadID = this.route.snapshot.queryParams['threadID'];
      this.threadService.getSingleThread(this.threadID).subscribe((data) => {
        this.thread = data;
        this.replyData.push(
          { name: '', value: this.thread.title, isHtml: true },
          { name: '', value: this.thread.content, isHtml: true }
        );
        this.threadOwnerEmail = this.thread.threadOwnerEmail;
      });
    } else {
      this.replyID = +this.route.snapshot.queryParams['replyID'];
      this.threadRepliesService.getReplyByID(this.replyID).subscribe((data) => {
        this.reply = data[0];
        this.replyContent = this.reply.content;
        this.threadID = this.reply.threadID;
        this.parentReplyID = this.reply.replyID;
        this.threadOwnerEmail = this.reply.threadOwnerEmail;
        this.replyData.push({
          name: '',
          value: this.replyContent,
          isHtml: true,
        });
      });
    }
  }

  onSubmit(content: any) {
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
          this.bsModalRef = this.modalService.show(SuccessPopupComponent, {
            initialState: {
              message: 'Reply posted successfully',
            },
          });
          this.sendEmailToOwner(this.threadOwnerEmail, this.replyContent);
        },
        error: (error) => {
          if (error.status == 444) {
            this.alertRef = this.modalService.show(InvalidPopupComponent, {
              initialState: {
                message: error.error.message, //make use of reusable success pop up , sends message to it
              },
            });
          }
          console.error('Error creating reply:', error);
          const queryParams = {
            threadID: this.threadID,
          };
          this.router.navigate(['community', 'post-replies'], {
            queryParams: queryParams,
          });
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

  sendEmailToOwner(threadOwnerEmail: string, replyContent: string) {
    const emailContent = replyContent ? replyContent : this.thread.content;
    const plainTextContent = emailContent.replace(/<[^>]+>/g, '');
    // Slice plainTextContent after 20 characters and add ellipsis
    const truncatedContent =
      plainTextContent.length > 20
        ? plainTextContent.slice(0, 20) + '...'
        : plainTextContent;
    const emailModel: EmailModel = {
      toEmail: threadOwnerEmail,
      subject: 'New Reply on Your Thread',
      body: `A new reply has been posted on your thread - " ${truncatedContent}"     visit  Discussit!  to view more`,
    };
    this.http
      .post(this.baseUrl + 'Email', emailModel, {
        responseType: 'text',
      })
      .subscribe(
        (response) => {},
        (error) => {
          console.error('Error sending email:', error);
        }
      );
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
