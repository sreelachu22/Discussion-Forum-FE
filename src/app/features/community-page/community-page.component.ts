import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/service/http.service';

@Component({
  selector: 'app-community-page',
  templateUrl: './community-page.component.html',
  styleUrls: ['./community-page.component.css'],
})
export class CommunityPageComponent {
  constructor(
    private httpService: HttpService,
    private router: Router,
    private activateRoute: ActivatedRoute
  ) {}
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

  communityID: number = 0;
  ngOnInit(): void {
    this.getCategoriesInCommunity();
    this.activateRoute.queryParams.subscribe((params) => {
      this.communityID = params['communityID'];
      // Now you have access to communityCategoryMappingID
      // Use it as needed in your component logic.
    });
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

  navigateToPosts(communityCategoryMappingID: number) {
    this.router.navigate(['category_threads'], {
      queryParams: {
        communityCategoryMappingID: communityCategoryMappingID,
      },
    });
  }
  navigateToCommunityManagement(communityID: number) {
    this.router.navigate(['community_management_dashboard'], {
      queryParams: {
        communityID: communityID,
      },
    });
  }
}
