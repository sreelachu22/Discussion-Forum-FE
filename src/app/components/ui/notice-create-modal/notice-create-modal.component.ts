// Import necessary modules and components
import { Component, EventEmitter, Output, TemplateRef } from '@angular/core';
import { NoticesService } from 'src/app/service/HttpServices/notices.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { DatePipe } from '@angular/common';
import { CommunityDataService } from 'src/app/service/DataServices/community-data.service';

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
    private modalRef: BsModalRef,
    private datePipe: DatePipe,
    private communityDataService: CommunityDataService
  ) {}

  faEdit = faEdit;
  faDelete = faTrash;

  @Output() noticeCreated: EventEmitter<any> = new EventEmitter<any>();

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
    this.communityDataService.communityID$.subscribe((id) => {
      this.newNotice.communityID = id;
    });
    this.newNotice.createdBy = sessionStorage.getItem('userID');
    // Ensure all required fields are provided
    if (
      this.newNotice.title &&
      this.newNotice.content &&
      this.newNotice.expiresAt
    ) {
      this.noticesService.addData(this.apiUrl, this.newNotice).subscribe(
        (response) => {
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

  decline() {
    this.modalRef?.hide();
  }
}
