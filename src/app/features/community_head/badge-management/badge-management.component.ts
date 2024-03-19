import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommunityDataService } from 'src/app/service/DataServices/community-data.service';
import { BadgeService } from 'src/app/service/HttpServices/badge.service';
import { PointService } from 'src/app/service/HttpServices/point.service';

export interface Badge {
  goldMinScore: number;
  silverMinScore: number;
  bronzeMinScore: number;
}

@Component({
  selector: 'app-badge-management',
  templateUrl: './badge-management.component.html',
  styleUrls: ['./badge-management.component.css'],
})
export class BadgeManagementComponent {
  badgeFields: { label: string; field: keyof Badge }[] = [
    { label: 'Minimum score for  Gold  badge', field: 'goldMinScore' },
    { label: 'Minimum score for Silver badge', field: 'silverMinScore' },
    { label: 'Minimum score for Bronze badge', field: 'bronzeMinScore' },
  ];

  constructor(
    private router: Router,
    private communityDataService: CommunityDataService,
    private badgeService: BadgeService
  ) {}

  communityID: number = 0;
  communityName: string | null = '';
  breadcrumbs: { label: string; route: string }[] = [];
  ngOnInit() {
    this.communityDataService.communityID$.subscribe((id) => {
      this.communityID = id;
    });
    this.getPointsByCommunity();
    this.communityName = sessionStorage.getItem('communityName');
    this.breadcrumbs = [
      { label: 'Home', route: '/home' },
      { label: this.communityName || '', route: '/community' },
      {
        label: 'Community Management',
        route: `/community-management-dashboard`,
      },
      {
        label: 'Score Management',
        route: '/score-management',
      },
    ];
  }
  badge!: Badge;

  getPointsByCommunity() {
    this.badgeService
      .getBadgeScoreRanges(this.communityID)
      .subscribe((data) => {
        this.badge = data;
      });
  }
  updateForm() {
    console.log(this.badgeFields);
    console.log(this.communityID);
    this.badgeService
      .updateBadges(this.communityID, this.badge)
      .subscribe((data) => {
        console.log('updated badges');
        this.router.navigate(['/community-management-dashboard']);
      });
  }

  close() {
    this.router.navigate(['/community-management-dashboard']);
  }
}
