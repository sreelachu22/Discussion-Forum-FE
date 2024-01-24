import { Component } from '@angular/core';

@Component({
  selector: 'app-community-management-dashboard',
  templateUrl: './community-management-dashboard.component.html',
  styleUrls: ['./community-management-dashboard.component.css'],
})
export class CommunityManagementDashboardComponent {
  cardTitles: string[] = [
    'User Management',
    'Category Management',
    'Closed threads',
    'Notices',
  ];
}
