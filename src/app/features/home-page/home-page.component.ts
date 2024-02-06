import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent {
  constructor(private activateRoute: ActivatedRoute, private router: Router) {}
  communityID: number = 1;

  ngOnInit() {}

  navigateToCommunity() {
    this.router.navigate(['community'], {
      queryParams: {
        communityID: this.communityID,
      },
    });
  }

  navigateToAdminDashboard() {
    this.router.navigate(['admin-dashboard']);
  }
}
