import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent {
  constructor(private router: Router) {}
  breadcrumbs = [
    { label: 'Home', route: '/home' },
    { label: 'Admin Dashboard', route: '/admin-dashboard' },
  ];
  cardTitles: { title: string; path: string }[] = [
    { title: 'Category Management', path: 'admin-category-management' },
  ];

  navigateToCard(path: string) {
    // Define your route based on the card title or any other logic
    const route = `admin-dashboard/${path}`;
    this.router.navigate([route]);
  }
}
