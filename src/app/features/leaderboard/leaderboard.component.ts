import { Component, OnInit } from '@angular/core';
import {
  LeaderboardService,
  TopUsers,
} from 'src/app/service/HttpServices/leaderboard.service';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css'],
})
export class LeaderboardComponent implements OnInit {
  constructor(private leaderboardService: LeaderboardService) {}
  topUsers: TopUsers[] = [];
  ngOnInit(): void {
    this.getTopUsers(4);
  }

  getTopUsers(limit: number) {
    this.leaderboardService.getTopUsers(limit).subscribe({
      next: (data: TopUsers[]) => {
        this.topUsers = data;
      },
      error: (error: any) => {
        console.error('Error getting top users:', error);
        // Handle error as needed
      },
    });
  }

  getBadgeName(index: number): string {
    if (index === 0) {
      return 'Elite Contributor';
    } else if (index === 1) {
      return 'Expert Contributor';
    } else if (index === 2) {
      return 'Intermediate Contributor';
    } else {
      return 'Novice Contributor';
    }
  }
}
