import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { environment } from 'src/app/environments/environment';
import { NoticesService } from 'src/app/service/HttpServices/notices.service';

@Component({
  selector: 'app-user-notices',
  templateUrl: './user-notices.component.html',
  styleUrls: ['./user-notices.component.css'],
  providers: [DatePipe],
})
export class UserNoticesComponent {
  public notices: any[] = [];
  baseUrl: string = environment.apiUrl;
  private apiUrl = this.baseUrl + 'Notice'; // Initial URL, you can set it dynamically based on your requirement

  constructor(
    private noticesService: NoticesService,
    private datePipe: DatePipe
  ) {}

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
