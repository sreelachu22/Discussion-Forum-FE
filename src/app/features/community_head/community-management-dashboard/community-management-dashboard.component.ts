import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-community-management-dashboard',
  templateUrl: './community-management-dashboard.component.html',
  styleUrls: ['./community-management-dashboard.component.css'],
})
export class CommunityManagementDashboardComponent {
  constructor(private router: Router) {}

  breadcrumbs = [
    { label: 'Home', route: '/home_page' },
    { label: 'Community', route: '/community_page' },
    { label: 'Community Management', route: '/community_management_dashboard' },
  ];
  // array for card data in ui

  cardTitles: { title: string; path: string }[] = [
    { title: 'User Management', path: 'user-management' },
    { title: 'Category Management', path: 'category-management' },
    { title: 'Closed Threads', path: 'closed-threads' },
    { title: 'Notice Management', path: 'notice-management' },
  ];

  navigateToCard(path: string) {
    const route = `community_management_dashboard/${path}`;
    this.router.navigate([route]);
  }
}
