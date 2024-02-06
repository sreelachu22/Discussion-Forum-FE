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
    { label: 'Home', route: '/home' },
    { label: 'Community', route: '/community' },
    { label: 'Community Management', route: '/community-management-dashboard' },
  ];
  // array for card data in ui

  cardTitles: { title: string; path: string; imageSrc: string }[] = [
    {
      title: 'User Management',
      path: 'user-management',
      imageSrc: 'assets/images/settings.png',
    },
    {
      title: 'Category Management',
      path: 'category-management',
      imageSrc: 'assets/images/settings.png',
    },
    {
      title: 'Closed Threads',
      path: 'closed-posts',
      imageSrc: 'assets/images/settings.png',
    },
    {
      title: 'Notice Management',
      path: 'notice-management',
      imageSrc: 'assets/images/settings.png',
    },
  ];

  navigateToCard(path: string) {
    const route = `community-management-dashboard/${path}`;
    this.router.navigate([route]);
  }
}
