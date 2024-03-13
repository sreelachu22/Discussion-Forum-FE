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
          { name: '', value: this.thread.title.slice(0,100) + '...', isHtml: true },
          // { name: '', value: this.thread.content, isHtml: true }
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
          value: this.removeHtmlTags(this.replyContent).slice(0,100) + '...',
          isHtml: true,
        });
      });
    }
  }
  // Define a function to remove HTML tags
removeHtmlTags(html: string): string {
  return html.replace(/<[^>]*>/g, '');
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
    // Slice plainTextContent after 100 characters and add ellipsis
    const truncatedContent =
      plainTextContent.length > 100
        ? plainTextContent.slice(0, 100) + '...'
        : plainTextContent;
    // Define the HTML content template
const emailHtmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Reply Notification</title>
  <style>
    /* CSS Styles */
    body {
      font-family: "Montserrat" !important;
      background-color: #f4f4f4;
      padding: 20px;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #fff;
      border-radius: 5px;
      box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.1);
      padding: 20px;
    }
    .header {
      background-color: #707fff;
      color: #fff;
      padding: 10px;
      text-align: center;
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;
    }
    .content, .footer {
      padding: 10px;
      text-align: center;
      background-color:#dbe7f7;
    }
    .title{
      color:#707fff
    }
    a{
      text-decoration:none;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>New Reply Notification</h2>
    </div>
    <div class="content"><br>
          ${
            replyContent
              ? `<p>A new reply has been posted under your thread reply:</p> <p>"${truncatedContent}"</p>`
              : `<p>A new reply has been posted on your thread:</p> <p>"${truncatedContent}"</p>`
          }<br>
          <p>Visit <a href="https://localhost:4200">Discussit</a> to view more.</p>
          <img src="https://iili.io/JW1H3F4.jpg" width="50%" height="50%"/>
        </div>
    <div class="footer">
      <p>Thank you for using our service!</p>
    </div>
  </div>
</body>
</html>
`;

    const emailModel: EmailModel = {
      toEmail: threadOwnerEmail,
      subject: 'New Reply on Your Thread',
      body: emailHtmlContent,
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
