import { Component } from '@angular/core';
import { HttpService } from 'src/app/service/http.service';

@Component({
  selector: 'app-community-page',
  templateUrl: './community-page.component.html',
  styleUrls: ['./community-page.component.css'],
})
export class CommunityPageComponent {
  constructor(private httpService: HttpService) {}
  categories: {
    communityCategoryMappingID: number;
    communityID: number;
    communityCategoryID: number;
    communityCategoryName: string;
    description: string;
    isDeleted: boolean;
    createdAt: Date;
    modifiedAt: Date;
    threadCount: number;
  }[] = [];

  ngOnInit(): void {
    this.getCategoriesInCommunity();
  }

  id: number = 1;
  getCategoriesInCommunity() {
    this.httpService.getCategories(this.id).subscribe({
      next: (data: any) => {
        this.categories = data;
        console.log(data);
      },
      error: (error: Error) => {
        alert('Error has occured, ' + error.message);
      },
      complete: () => {
        console.log('Completed');
      },
    });
  }

  sendCategoryDetails(detailsToSend: { communityCategoryMappingID: number }) {}
}
