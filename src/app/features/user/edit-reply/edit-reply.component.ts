import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { SuccessPopupComponent } from 'src/app/components/ui/success-popup/success-popup.component';
import { environment } from 'src/app/environments/environment';
import { ThreadRepliesService } from 'src/app/service/HttpServices/thread-replies.service';

@Component({
  selector: 'app-edit-reply',
  templateUrl: './edit-reply.component.html',
  styleUrls: ['./edit-reply.component.css'],
})
export class EditReplyComponent implements OnInit {
  reply: any;
  thread: any;
  replyID!: number;
  replyUser!: string;
  threadOwnerEmail!: string;
  replyCreatedBy!: string;
  replyContent!: string;
  threadID!: number;
  parentReplyID!: number;
  replyData: { name: string; value: any; isHtml?: boolean }[] = [];
  justifyPosition: string = 'flex-start';
  bsModalRef!: BsModalRef;
  baseUrl: string = environment.apiUrl;
  putBaseURL: string = this.baseUrl + 'Reply';
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private threadRepliesService: ThreadRepliesService,
    private http: HttpClient,
    private modalService: BsModalService
  ) {}

  ngOnInit(): void {
    this.replyID = +this.route.snapshot.queryParams['replyID'];

    this.threadRepliesService.getReplyByID(this.replyID).subscribe((data) => {
      this.reply = data[0];
      this.replyContent = this.reply.content;
      this.threadID = this.reply.threadID;
      this.parentReplyID = this.reply.replyID;
      this.threadOwnerEmail = this.reply.threadOwnerEmail;
      this.replyCreatedBy = this.reply.createdBy;
      this.replyData.push({ name: '', value: this.replyContent, isHtml: true });
    });
  }

  onSubmit(content: any) {
    const url = `${this.putBaseURL}/${this.replyID}?modifierId=${this.replyCreatedBy}`;
    this.http
      .put(url, JSON.stringify(content.editorContent), {
        headers: {
          'Content-Type': 'application/json',
          Accept: '*/*',
        },
      })
      .subscribe({
        next: (response) => {
          this.bsModalRef = this.modalService.show(SuccessPopupComponent, {
            initialState: {
              message: 'Reply edited successfully',
            },
          });
        },
        error: (error) => {
          console.error('Error editing thread:', error);
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
}
