// Import necessary modules and components
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { NoticesService } from 'src/app/service/HttpServices/notices.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { DatePipe } from '@angular/common';
import { NoticeCreateModalComponent } from 'src/app/components/ui/notice-create-modal/notice-create-modal.component';
 
// Decorate the component with @Component
@Component({
  selector: 'app-notices', // Selector for the component
  templateUrl: './notices.component.html', // Path to the HTML template file
  styleUrls: ['./notices.component.css'], // Array of stylesheets for the component
  providers: [DatePipe],
})
export class NoticesComponent {
  public notices: any[] = [];
  public newNotice: any = {};
  public selectedNotice: any = {};
 
  private apiUrl = 'https://localhost:7160/api/Notice'; // Initial URL, you can set it dynamically based on your requirement
 
  // variable to hold a reference to the modal
  modalRef?: BsModalRef;
 
  // Configuration object for the ngx-bootstrap datepicker
  bsDatepickerConfig: any = {
    dateInputFormat: 'YYYY-MM-DDTHH:mm:ss.SSS', // Specifies the date input format for the datepicker
  };
 
  constructor(
    private noticesService: NoticesService,
    private modalService: BsModalService,
    private datePipe: DatePipe,
  ) {}

  faEdit = faEdit;
  faDelete = faTrash;
 
  ngOnInit(): void {
    this.getValues();
  }

  openCreateNoticeModal() {
    this.modalRef = this.modalService.show(NoticeCreateModalComponent);
    this.modalRef.content?.noticeCreated.subscribe(() => {
      // Trigger the getValues method to refresh data
      this.getValues();
    });
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
 
  openUpdateModal(template: TemplateRef<any>, notice: any) {
    // Set selectedNotice with existing data for updating
    this.selectedNotice = { ...notice }; // Use spread operator to create a copy
    console.log(this.selectedNotice);
    this.modalRef = this.modalService.show(template);
  }
 
 
  // Function to format the date in the desired format
  private formatBackendDate(date: Date | null): string | null {
    return date !== null
      ? this.datePipe.transform(date, 'yyyy-MM-ddTHH:mm:ss.SSS')
      : null;
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
 
      this.noticesService
        .updateData(this.apiUrl, this.selectedNotice.noticeID, requestData)
        .subscribe(
          (response) => {
            console.log('PUT Request Successful:', response);
            this.getValues();
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
 
  openDeleteModal(deleteModalTemplate: TemplateRef<any>, notice: any): void {
    // Set the notice to be deleted
    this.selectedNotice = notice;
 
    // Open the modal
    this.modalRef = this.modalService.show(deleteModalTemplate);
  }
 
  deleteNotice(): void {
    if (this.selectedNotice) {
      const noticeId = this.selectedNotice.noticeID;
 
      this.noticesService.deleteData(this.apiUrl, noticeId).subscribe(
        (response) => {
          console.log('DELETE Request Successful:', response);
          this.getValues();
        },
        (error) => {
          console.error('DELETE Request Failed:', error);
        }
      );
    }
    // Close the modal after deleting the notice
    this.modalRef?.hide();
  }
 
}