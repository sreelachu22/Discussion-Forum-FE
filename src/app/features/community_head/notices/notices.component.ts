
// Import necessary modules and components
import { Component, TemplateRef} from '@angular/core';
import { NoticesService } from 'src/app/service/notices.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { DatePipe } from '@angular/common';


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

  modalRef?: BsModalRef;

  constructor(private noticesService: NoticesService, private modalService: BsModalService,private datePipe: DatePipe) {}



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

  // addNotice() {

  //   // Ensure all required fields are provided
  //   if (this.newNotice.title && this.newNotice.content && this.newNotice.expiresAt) {
  //     this.noticesService.addData(this.apiUrl, this.newNotice).subscribe(
  //       (response) => {
  //         console.log('POST Request Successful:', response);
  //         this.getValues();
  //         this.newNotice = {}; // Clear the form
  //       },
  //       (error) => {
  //         console.error('POST Request Failed:', error);
  //       }
  //     );
  //   } else {
  //     console.error('Please provide all required fields.');
  //     // You might want to display an error message to the user
  //   }
  // }

//   addNotice() {

//     // dummy for testing purposes

//     const newNotice = {
//       communityID: 1, 
//       title: 'This is a notice',
//       content: 'Quick Announcement',
//       expiresAt: '2024-02-04T12:33:23.713', // replace with an appropriate expiration date
//       createdBy: 'c9b6c549-9e79-4ad4-99cd-28bab5927177',
//       modifiedBy: 'c9b6c549-9e79-4ad4-99cd-28bab5927177'
//     };

//     // Ensure all required fields are provided
//     if (newNotice.title && newNotice.content && newNotice.expiresAt) {
//       this.noticesService.addData(this.apiUrl, newNotice).subscribe(
//         (response) => {
//           console.log('POST Request Successful:', response);
//           this.getValues();
//         },
//         (error) => {
//           console.error('POST Request Failed:', error);
//         }
//       );
//     } else {
//       console.error('Please provide all required fields.');
//       // You might want to display an error message to the user
//     }
// }




openModal(template: TemplateRef<any>) {
  // Reset selectedNotice for creating a new notice
  this.newNotice = {};
  this.modalRef = this.modalService.show(template);
}

openUpdateModal(template: TemplateRef<any>, notice: any) {
  // Set selectedNotice with existing data for updating
  // Make sure 'notice' has the necessary properties
  this.selectedNotice = { ...notice }; // Use spread operator to create a copy
  console.log(this.selectedNotice);
  this.modalRef = this.modalService.show(template);
}


addNotice() {
  // Ensure all required fields are provided
  if (this.newNotice.communityID && this.newNotice.title && this.newNotice.content && this.newNotice.expiresAt && this.newNotice.createdBy) {
    
    // Format the expiresAt property before sending it to the backend
    this.newNotice.expiresAt = this.formatBackendDate(this.newNotice.expiresAt);

    this.noticesService.addData(this.apiUrl, this.newNotice).subscribe(
      (response) => {
        console.log('POST Request Successful:', response);
        this.getValues();
      },
      (error) => {
        console.error('POST Request Failed:', error);
      }
    );

    // Close the modal after adding the notice
    this.modalRef?.hide();
  } else {
    console.error('Please provide all required fields.');
    // You might want to display an error message to the user
  }
}

// Function to format the date in the desired format
private formatBackendDate(date: Date | null): string | null {
  return date !== null ? this.datePipe.transform(date, 'yyyy-MM-ddTHH:mm:ss.SSS') : null;
}







  // updateNotice(notice: any) {
 
   // // const updatedNotice = {
    //   communityID: notice.communityID,
    //   title: notice.title,
    //   content: notice.content,
    //   expiresAt: notice.expiresAt,
    //   createdBy: notice.createdBy,
    //   modifiedBy: notice.modifiedBy
//    // };


    // dummy for testing purposes
    // const noticeID = 3;
    // const updatedNotice = {
    //   communityID: 1, 
    //   title: 'Sample Title',
    //   content: 'This is a sample notice content.',
    //   expiresAt: '2024-02-04T12:33:23.713', // replace with an appropriate expiration date
    //   createdBy: 'c9b6c549-9e79-4ad4-99cd-28bab5927177',
    //   modifiedBy: 'c9b6c549-9e79-4ad4-99cd-28bab5927177'
    // };
  
    ////notice.noticeID

  //   this.noticesService.updateData(this.apiUrl, noticeID, updatedNotice).subscribe(
  //     (response) => {
  //       console.log('PUT Request Successful:', response);
  //       this.getValues();
  //       this.selectedNotice = {};
  //     },
  //     (error) => {
  //       console.error('PUT Request Failed:', error);
  //     }
  //   );
  // }





  updateNotice() {
    // Ensure all required fields are provided for update
    if (
      this.selectedNotice.id &&
      this.selectedNotice.communityID &&
      this.selectedNotice.title &&
      this.selectedNotice.content &&
      this.selectedNotice.expiresAt &&
      this.selectedNotice.createdBy &&
      this.selectedNotice.modifiedBy
    ) {
      // Create a new object with only the required properties
      const requestData = {
        id: this.selectedNotice.id,
        communityID: this.selectedNotice.communityID,
        title: this.selectedNotice.title,
        content: this.selectedNotice.content,
        expiresAt: this.selectedNotice.expiresAt,
        createdBy: this.selectedNotice.createdBy,
        modifiedBy: this.selectedNotice.modifiedBy
      };
  
      this.noticesService.updateData(this.apiUrl, this.selectedNotice.id, requestData).subscribe(
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
      // You might want to display an error message to the user
    }
  }
  
 
  

  deleteNotice(noticeId: number) {
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


  // private formatDate(dateString: string): string {
  //   const options: Intl.DateTimeFormatOptions = {
  //     year: 'numeric',
  //     month: 'long',
  //     day: 'numeric',
  //     hour: 'numeric',
  //     minute: 'numeric',
  //     second: 'numeric'
  //   };
  
  //   return new Date(dateString).toLocaleDateString(undefined, options);
  // }




  
}

