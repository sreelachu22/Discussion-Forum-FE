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
    this.getTopUsers(16);
  }

  //get top users based on score.
  getTopUsers(limit: number) {
    this.leaderboardService.getTopUsers(limit).subscribe({
      next: (data: TopUsers[]) => {
        this.topUsers = data;
      },
      error: (error: any) => {
        console.error('Error getting top users:', error);
      },
    });
  }

  //assign badges based on levels
  getBadge(score: number): string {
    if (score >= 100) {
      return '../../../assets/images/gold_medal.png';
    } else if (score >= 50) {
      return '../../../assets/images/silver_medal.png';
    } else {
      return '../../../assets/images/bronze_medal.png';
    }
  }
}
