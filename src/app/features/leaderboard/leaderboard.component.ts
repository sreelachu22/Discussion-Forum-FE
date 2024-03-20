import { Component, OnInit } from '@angular/core';
import { CommunityDataService } from 'src/app/service/DataServices/community-data.service';
import { BadgeService } from 'src/app/service/HttpServices/badge.service';
import {
  LeaderboardService,
  TopUsers,
} from 'src/app/service/HttpServices/leaderboard.service';
import { LoaderService } from 'src/app/service/HttpServices/loader.service';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css'],
})
export class LeaderboardComponent implements OnInit {
  constructor(
    private leaderboardService: LeaderboardService,
    private loaderService: LoaderService,
    private badgeService: BadgeService,
    private communityDataService: CommunityDataService
  ) {}
  topUsers: TopUsers[] = [];
  isLoading: boolean = false;
  communityID: number = 0;
  ngOnInit(): void {
    this.communityDataService.communityID$.subscribe((id) => {
      this.communityID = id;
    });
    this.loaderService.isLoading$.subscribe((isLoading) => {
      this.isLoading = isLoading;
    });
    this.getTopUsers(16);
  }

  //get top users based on score.
  getTopUsers(limit: number) {
    this.leaderboardService.getTopUsers(limit).subscribe({
      next: (data: TopUsers[]) => {
        this.topUsers = data;
        this.badgeService
          .getBadgeScoreRanges(this.communityID)
          .subscribe((scoreRanges) => {
            this.badgeService.setBadgeScoreRanges(scoreRanges);
          });
      },
      error: (error: any) => {
        console.error('Error getting top users:', error);
      },
    });
  }

  //assign badges based on levels
  getBadge(score: number): string {
    return this.badgeService.getBadgeByScore(score);
  }
}
