import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-community-management-dashboard',
  templateUrl: './community-management-dashboard.component.html',
  styleUrls: ['./community-management-dashboard.component.css'],
})
export class CommunityManagementDashboardComponent {
  constructor(private router: Router) {}

  // array for card data in ui

  cardTitles: { title: string; path: string }[] = [
    { title: 'User Management', path: 'user-management' },
    { title: 'Category Management', path: 'category-management' },
    { title: 'Closed Threads', path: 'closed-threads' },
    { title: 'Notice Management', path: 'notice-management' },
  ];

  navigateToCard(path: string) {
    const route = `community-management/${path}`;
    this.router.navigate([route]);
  }
}
