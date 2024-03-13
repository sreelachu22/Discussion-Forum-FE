import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-score-management',
  templateUrl: './score-management.component.html',
  styleUrls: ['./score-management.component.css'],
})
export class ScoreManagementComponent {
  score!: {
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
  };

  fields = [
    {
      id: 'scoreSystem',
      label: 'Score',
      name: 'scoreSystem',
      type: 'number',
      value: '',
      required: true,
      minlength: 1,
      maxlength: 3,
    },
    // Add more fields here
  ];

  scoreSystem: any;

  constructor(private router: Router) {}

  updateForm() {
    console.log('Submitted Scores:', this.scoreSystem);
  }

  close() {
    this.router.navigate(['/community-management-dashboard']);
  }
}
