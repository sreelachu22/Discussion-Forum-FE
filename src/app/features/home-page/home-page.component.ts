import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faL } from '@fortawesome/free-solid-svg-icons';
import { AccountsService } from 'src/app/service/HttpServices/account.service';
import {
  CommunityDetails,
  CommunityService,
} from 'src/app/service/HttpServices/community.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent {
  constructor(
    private httpService: CommunityService,
    private activateRoute: ActivatedRoute,
    private router: Router,
    private accountService: AccountsService
  ) {}

  isSuperAdmin: boolean = false;
  communities: CommunityDetails[] = [];
  ngOnInit(): void {
    this.activateRoute.queryParams.subscribe();
    this.loadCommunities();
    this.isSuperAdmin = this.accountService.isSuperAdmin;
  }

  loadCommunities() {
    this.httpService.getAllCommunities().subscribe((data) => {
      console.log(data);
      this.communities = data;
    });
  }

  navigateToCommunity(communityID: number, communityName: string) {
    this.router.navigate(['community'], {
      queryParams: {
        communityID: communityID,
        communityName: communityName,
      },
    });
  }

  navigateToAdminDashboard() {
    this.router.navigate(['admin-dashboard']);
  }
}
