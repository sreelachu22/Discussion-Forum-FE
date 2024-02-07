import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommunityDetails, CommunityService } from 'src/app/service/HttpServices/community.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent {
  constructor(
    private httpService: CommunityService,
    private activateRoute: ActivatedRoute, 
    private router: Router
  ) {}

  communities : CommunityDetails[] = [];
  ngOnInit():void {
    this.loadCommunities();
  }

  loadCommunities() {
    this.httpService
    .getAllCommunities()
    .subscribe((data) => {
      console.log(data);
    this.communities = data;
  });
  }

  navigateToCommunity(communityId: number) {
    this.router.navigate(['community'], {
      queryParams: {
        communityID: communityId,
      },
    });
  }

  navigateToAdminDashboard() {
    this.router.navigate(['admin-dashboard']);
  }
}
