// Import necessary modules and components
import { Component, TemplateRef } from '@angular/core';
import { NoticesService } from 'src/app/service/HttpServices/notices.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { DatePipe } from '@angular/common';
import { DeleteModalComponent } from 'src/app/components/ui/delete-modal/delete-modal.component';
import { NoticeCreateModalComponent } from 'src/app/components/ui/notice-create-modal/notice-create-modal.component';
import { NoticeUpdateModalComponent } from 'src/app/components/ui/notice-update-modal/notice-update-modal.component';
import { CommunityDataService } from 'src/app/service/DataServices/community-data.service';

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

  breadcrumbs = [
    { label: 'Home', route: '/home' },
    { label: 'Community', route: '/community' },
    { label: 'Community Management', route: '/community-management-dashboard' },
    {
      label: 'Notice Management',
      route: '/community-management-dashboard/notice-management',
    },
  ];
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
    private communityDataService : CommunityDataService,
  ) {}

  faEdit = faEdit;
  faDelete = faTrash;

  communityID : number = 0;
  ngOnInit(): void {
    this.getValues();
    this.communityDataService.communityID$.subscribe((id) => {
      this.communityID = id;
    });
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

  openUpdateNoticeModal(notice: any) {
    this.modalRef = this.modalService.show(NoticeUpdateModalComponent, {
      initialState: {
        notice: notice
      }
    });
    this.modalRef.content?.noticeUpdated.subscribe(() => {
      this.getValues();
    });
  }

  

  // Function to format the date in the desired format
  private formatBackendDate(date: Date | null): string | null {
    return date !== null
      ? this.datePipe.transform(date, 'yyyy-MM-ddTHH:mm:ss.SSS')
      : null;
  }

  // BsModalRef stands for Bootstrap Modal Reference.
  bsmodalRef?: BsModalRef;
  //methods for open modal for delete
  openDeleteModal(notice: any): void {
    this.selectedNotice = notice;
    const initialState = {
      confirmFunction: this.deleteNotice.bind(this),
      declineFunction: this.decline.bind(this),
    };

    this.bsmodalRef = this.modalService.show(DeleteModalComponent, {
      initialState,
    });
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

  decline() {
    this.modalRef?.hide();
  }
}
