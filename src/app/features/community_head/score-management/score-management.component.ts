import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommunityDataService } from 'src/app/service/DataServices/community-data.service';
import { PointService } from 'src/app/service/HttpServices/point.service';

export interface Score {
  threadCreated: number;
  threadUpdated: number;
  threadDeleted: number;
  threadUpvotedBy: number;
  threadUpvotedOn: number;
  threadDownvotedBy: number;
  threadDownvotedOn: number;
  removeThreadUpvoteBy: number;
  removeThreadUpvoteOn: number;
  removeThreadDownvoteBy: number;
  removeThreadDownvoteOn: number;
  replyCreated: number;
  replyUpdated: number;
  replyDeleted: number;
  replyUpvotedBy: number;
  replyUpvotedOn: number;
  replyDownvotedBy: number;
  replyDownvotedOn: number;
  removeReplyUpvoteBy: number;
  removeReplyUpvoteOn: number;
  removeReplyDownvoteBy: number;
  removeReplyDownvoteOn: number;
}

@Component({
  selector: 'app-score-management',
  templateUrl: './score-management.component.html',
  styleUrls: ['./score-management.component.css'],
})
export class ScoreManagementComponent {
  scoreFields: { label: string; field: keyof Score; value: number }[] = [
    { label: 'Thread Created', field: 'threadCreated', value: 0 },
    { label: 'Thread Updated', field: 'threadUpdated', value: 0 },
    { label: 'Thread Deleted', field: 'threadDeleted', value: 0 },
    { label: 'Thread Upvoted By', field: 'threadUpvotedBy', value: 0 },
    { label: 'Thread Upvoted On', field: 'threadUpvotedOn', value: 0 },
    { label: 'Thread Downvoted By', field: 'threadDownvotedBy', value: 0 },
    { label: 'Thread Downvoted On', field: 'threadDownvotedOn', value: 0 },
    {
      label: 'Remove Thread Upvote By',
      field: 'removeThreadUpvoteBy',
      value: 0,
    },
    {
      label: 'Remove Thread Upvote On',
      field: 'removeThreadUpvoteOn',
      value: 0,
    },
    {
      label: 'Remove Thread Downvote By',
      field: 'removeThreadDownvoteBy',
      value: 0,
    },
    {
      label: 'Remove Thread Downvote On',
      field: 'removeThreadDownvoteOn',
      value: 0,
    },
    { label: 'Reply Created', field: 'replyCreated', value: 0 },
    { label: 'Reply Updated', field: 'replyUpdated', value: 0 },
    { label: 'Reply Deleted', field: 'replyDeleted', value: 0 },
    { label: 'Reply Upvoted By', field: 'replyUpvotedBy', value: 0 },
    { label: 'Reply Upvoted On', field: 'replyUpvotedOn', value: 0 },
    { label: 'Reply Downvoted By', field: 'replyDownvotedBy', value: 0 },
    { label: 'Reply Downvoted On', field: 'replyDownvotedOn', value: 0 },
    { label: 'Remove Reply Upvote By', field: 'removeReplyUpvoteBy', value: 0 },
    { label: 'Remove Reply Upvote On', field: 'removeReplyUpvoteOn', value: 0 },
    {
      label: 'Remove Reply Downvote By',
      field: 'removeReplyDownvoteBy',
      value: 0,
    },
    {
      label: 'Remove Reply Downvote On',
      field: 'removeReplyDownvoteOn',
      value: 0,
    },
  ];

  constructor(
    private router: Router,
    private communityDataService: CommunityDataService,
    private pointService: PointService
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

  getPointsByCommunity() {
    this.pointService.getPoints(this.communityID).subscribe((data) => {
      this.score = data;
    });
  }

  score!: Score;
  updateForm() {
    console.log(this.scoreFields);
    console.log(this.communityID);
    this.pointService
      .updatePoints(this.communityID, this.score)
      .subscribe((data) => {
        console.log('updated scores');
        this.router.navigate(['/community-management-dashboard']);
      });
  }

  close() {
    this.router.navigate(['/community-management-dashboard']);
  }
}
