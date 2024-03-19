import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environments/environment';
import { Score } from 'src/app/features/community_head/score-management/score-management.component';

@Injectable({
  providedIn: 'root',
})
export class BadgeService {
  constructor(private http: HttpClient) {}

  private badgeScoreRanges: any;
  baseUrl = environment.apiUrl;

  updateBadges(communityID: number, updatedBadges: any): Observable<any> {
    const apiUrl = `${this.baseUrl}Badge/${communityID}`;
    return this.http.put(apiUrl, updatedBadges);
  }

  getBadgeScoreRanges(communityID: number): Observable<any> {
    const apiUrl = `${this.baseUrl}Badge/${communityID}`;
    return this.http.get(apiUrl);
  }

  setBadgeScoreRanges(scoreRanges: any): void {
    this.badgeScoreRanges = scoreRanges;
  }

  getBadgeByScore(score: number): string {
    if (score >= this.badgeScoreRanges.goldMinScore) {
      return '../../../assets/images/gold_medal.png';
    } else if (score >= this.badgeScoreRanges.silverMinScore) {
      return '../../../assets/images/silver_medal.png';
    } else {
      return '../../../assets/images/bronze_medal.png';
    }
  }
}
