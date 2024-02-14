// Import necessary modules and components
import {
  Component,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { NoticesService } from 'src/app/service/HttpServices/notices.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { DatePipe } from '@angular/common';
import { CommunityDataService } from 'src/app/service/DataServices/community-data.service';
import { environment } from 'src/app/environments/environment';

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

  baseUrl: string = environment.apiUrl;
  private apiUrl = this.baseUrl + 'Notice'; // Initial URL, you can set it dynamically based on your requirement

  // Configuration object for the ngx-bootstrap datepicker
  bsDatepickerConfig: any = {
    dateInputFormat: 'DD-MM-YYYY', // Specifies the date input format for the datepicker
    minDate: new Date(),
  };

  constructor(
    private noticesService: NoticesService,
    private modalRef: BsModalRef,
    private datePipe: DatePipe,
    private communityDataService: CommunityDataService
  ) {}

  @Input() notice: any = {};

  @Output() noticeUpdated: EventEmitter<any> = new EventEmitter<any>();

  faEdit = faEdit;
  faDelete = faTrash;

  ngOnInit(): void {
    this.selectedNotice = { ...this.notice };
  }

  updateNotice() {
    // Ensure all required fields are provided for update
    this.communityDataService.communityID$.subscribe((id) => {
      this.selectedNotice.communityID = id;
    });
    console.log(this.newNotice.communityID);
    this.selectedNotice.modifiedBy = sessionStorage.getItem('userID');
    if (
      this.selectedNotice.noticeID &&
      this.selectedNotice.title &&
      this.selectedNotice.content &&
      this.selectedNotice.expiresAt &&
      this.selectedNotice.createdBy
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
