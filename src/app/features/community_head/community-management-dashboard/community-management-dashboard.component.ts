import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  CategoryService,
  CommunityCategory,
} from 'src/app/service/HttpServices/category.service';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { BarChartComponent } from 'src/app/components/ui/bar-chart/bar-chart.component';
import {
  LeaderboardService,
  TopUsers,
} from 'src/app/service/HttpServices/leaderboard.service';

@Component({
  selector: 'app-community-management-dashboard',
  templateUrl: './community-management-dashboard.component.html',
  styleUrls: ['./community-management-dashboard.component.css'],
})
export class CommunityManagementDashboardComponent {
  constructor(
    private router: Router,
    private httpService: CategoryService,
    private leaderboardService: LeaderboardService
  ) {}

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
    // {
    //   title: 'Closed Threads',
    //   path: 'closed-posts',
    //   imageSrc: 'assets/images/settings.png',
    // },
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

  ngOnInit() {
    this.getCategoriesInCommunity();
  }

  categories: CommunityCategory[] = [];
  categoryChartOptions: any;
  id: number = 1;
  getCategoriesInCommunity() {
    this.httpService.getCategories(this.id).subscribe({
      next: (data: any) => {
        this.categories = data;
        this.updateCategoriesChartOptions();
        console.log(data);
      },
      error: (error: Error) => {
        alert('Error has occured, ' + error.message);
      },
      complete: () => {
        console.log('Completed');
      },
    });
  }

  updateCategoriesChartOptions() {
    const barColor = '#3f51b5';
    this.categoryChartOptions = {
      title: {
        text: 'Posts in Category',
      },
      theme: 'light2',
      animationEnabled: true,
      exportEnabled: true,
      axisY: {
        title: 'Posts',
        includeZero: true,
      },
      data: [
        {
          type: 'column',
          dataPoints: this.categories.map((category) => ({
            label: category.communityCategoryName,
            y: category.threadCount,
            color: barColor,
          })),
        },
      ],
    };
  }
}
