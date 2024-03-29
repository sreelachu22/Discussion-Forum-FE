import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faL } from '@fortawesome/free-solid-svg-icons';
import { CategoryMappingService } from 'src/app/service/DataServices/category-mapping.service';
import { CommunityDataService } from 'src/app/service/DataServices/community-data.service';
import { AccountsService } from 'src/app/service/HttpServices/account.service';
import {
  CommunityDetails,
  CommunityService,
} from 'src/app/service/HttpServices/community.service';
import { LoaderService } from 'src/app/service/HttpServices/loader.service';

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
    private accountService: AccountsService,
    private communityDataService: CommunityDataService,
    private loaderService: LoaderService,
  ) {}

  isSuperAdmin: boolean = false;
  communities: CommunityDetails[] = [];
  isLoading = false;
  ngOnInit(): void {
    this.loaderService.isLoading$.subscribe((isLoading) => {
      this.isLoading = isLoading;
    });
    this.activateRoute.queryParams.subscribe();
    this.loadCommunities();
    this.isSuperAdmin = sessionStorage.getItem('isSuperAdmin') == 'true';
  }

  loadCommunities() {
    this.httpService.getAllCommunities().subscribe((data) => {
      this.communities = data;
    });
  }

  navigateToCommunity(communityID: number, communityName: string) {
    this.communityDataService.setCommunityData(communityID);
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

  navigateToFirstPost() {
    this.router.navigate(['first-post']);
  }
}
