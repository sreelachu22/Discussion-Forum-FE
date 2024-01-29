import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent {
  constructor(private router: Router) {}

  cardTitles: { title: string; path: string }[] = [
    { title: 'Category Management', path: 'superadmin_category_management' },
  ];

  navigateToCard(path: string) {
    // Define your route based on the card title or any other logic
    const route = `admin_dashboard_page/${path}`;

    // Use the router to navigate
    this.router.navigate([route]);
  }
}
