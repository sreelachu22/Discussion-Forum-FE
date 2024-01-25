import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { NoticesService } from 'src/app/service/notices.service';


@Component({
  selector: 'app-user-notices',
  templateUrl: './user-notices.component.html',
  styleUrls: ['./user-notices.component.css'],
  providers: [DatePipe],
})

export class UserNoticesComponent {


  public notices: any[] = [];

  private apiUrl = 'https://localhost:7160/api/Notice'; // Initial URL, you can set it dynamically based on your requirement



  constructor(private noticesService: NoticesService,private datePipe: DatePipe) {}

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

}