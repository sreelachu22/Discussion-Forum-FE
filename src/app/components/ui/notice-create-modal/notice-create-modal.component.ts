// Import necessary modules and components
import { Component, EventEmitter, Output, TemplateRef } from '@angular/core';
import { NoticesService } from 'src/app/service/HttpServices/notices.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-notice-create-modal',
  templateUrl: './notice-create-modal.component.html',
  styleUrls: ['./notice-create-modal.component.css'],
  providers: [DatePipe],
})
export class NoticeCreateModalComponent {

  public notices: any[] = [];
  public newNotice: any = {};

  private apiUrl = 'https://localhost:7160/api/Notice'; // Initial URL, you can set it dynamically based on your requirement

  // variable to hold a reference to the modal
  // modalRef?: BsModalRef;

  // Configuration object for the ngx-bootstrap datepicker
  bsDatepickerConfig: any = {
    dateInputFormat: 'DD-MM-YYYY', // Specifies the date input format for the datepicker
    minDate: new Date(),
  };

  constructor(
    private noticesService: NoticesService,
    private modalRef : BsModalRef,
    private datePipe: DatePipe
  ) {}

  faEdit = faEdit;
  faDelete = faTrash;

  @Output() noticeCreated: EventEmitter<any> =  new EventEmitter<any>();

  ngOnInit(): void {
    this.getValues();
  }

  getValues() {
    this.noticesService.getData(this.apiUrl).subscribe(
      (response: any[]) => {
        this.notices = response;
      },
      (error) => {
        console.error('GET Request Failed:', error);
      }
    );
  }

  addNotice() {
    // Ensure all required fields are provided
    if (
      this.newNotice.communityID &&
      this.newNotice.title &&
      this.newNotice.content &&
      this.newNotice.expiresAt &&
      this.newNotice.createdBy
    ) {
      // Format the expiresAt property before sending it to the backend
      // this.newNotice.expiresAt = this.formatBackendDate(
      //   this.newNotice.expiresAt
      // );

      this.noticesService.addData(this.apiUrl, this.newNotice).subscribe(
        (response) => {
          console.log('POST Request Successful:', response);
          // this.getValues();
          this.noticeCreated.emit();
        },
        (error) => {
          console.error('POST Request Failed:', error);
        }
      );

      // Close the modal after adding the notice
      this.modalRef?.hide();
    } else {
      console.error('Please provide all required fields.');
    }
  }

  // Function to format the date in the desired format
  // private formatBackendDate(date: Date | null): string | null {
  //   return date !== null
  //     ? this.datePipe.transform(date, 'yyyy-MM-ddTHH:mm:ss.SSS')
  //     : null;
  // }

  decline() {
    this.modalRef?.hide();
  }
}


