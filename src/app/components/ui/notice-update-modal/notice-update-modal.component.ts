// Import necessary modules and components
import { Component, EventEmitter, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { NoticesService } from 'src/app/service/HttpServices/notices.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-notice-update-modal',
  templateUrl: './notice-update-modal.component.html',
  styleUrls: ['./notice-update-modal.component.css'],
  providers: [DatePipe],
})
export class NoticeUpdateModalComponent {
  // public notice: any ={}; 
  public newNotice: any = {};
  public selectedNotice: any = {};

  private apiUrl = 'https://localhost:7160/api/Notice'; // Initial URL, you can set it dynamically based on your requirement


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

  @Input() notice: any = {};

  @Output() noticeUpdated: EventEmitter<any> =  new EventEmitter<any>();


  faEdit = faEdit;
  faDelete = faTrash;

  ngOnInit(): void {
    this.selectedNotice = { ...this.notice };
  }

  updateNotice() {
    // Ensure all required fields are provided for update
    if (
      this.selectedNotice.noticeID &&
      this.selectedNotice.communityID &&
      this.selectedNotice.title &&
      this.selectedNotice.content &&
      this.selectedNotice.expiresAt &&
      this.selectedNotice.createdBy &&
      this.selectedNotice.modifiedBy
    ) {

      // Create a new object with only the required properties
      const requestData = {
        noticeID: this.selectedNotice.noticeID,
        communityID: this.selectedNotice.communityID,
        title: this.selectedNotice.title,
        content: this.selectedNotice.content,
        expiresAt: this.selectedNotice.expiresAt,
        createdBy: this.selectedNotice.createdBy,
        modifiedBy: this.selectedNotice.modifiedBy,
      };
      console.log(requestData);
      this.noticesService
        .updateData(this.apiUrl, this.selectedNotice.noticeID, requestData)
        .subscribe(
          (response) => {
            console.log('PUT Request Successful:', response);
            this.noticeUpdated.emit();
            // this.getValues();
            this.modalRef?.hide(); // Close the modal after updating the notice
          },
          (error) => {
            console.error('PUT Request Failed:', error);
          }
        );
    } else {
      console.error('Please provide all required fields.');
    }
  }

  decline() {
    this.modalRef?.hide();
  }
}
