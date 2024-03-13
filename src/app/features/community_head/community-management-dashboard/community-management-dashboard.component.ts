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
import { LoaderService } from 'src/app/service/HttpServices/loader.service';
import { CommunityDataService } from 'src/app/service/DataServices/community-data.service';

@Component({
  selector: 'app-community-management-dashboard',
  templateUrl: './community-management-dashboard.component.html',
  styleUrls: ['./community-management-dashboard.component.css'],
})
export class CommunityManagementDashboardComponent {
  constructor(
    private router: Router,
    private httpService: CategoryService,
    private leaderboardService: LeaderboardService,
    private loaderService: LoaderService,
    private communityDataService: CommunityDataService
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
    {
      title: 'Announcement Management',
      path: 'notice-management',
      imageSrc: 'assets/images/settings.png',
    },
    {
      title: 'Closed Threads',
      path: 'closed-threads',
      imageSrc: 'assets/images/settings.png',
    },
    {
      title: 'Score Management',
      path: 'score-management',
      imageSrc: 'assets/images/settings.png',
    },
  ];

  navigateToCard(path: string) {
    const route = `community-management-dashboard/${path}`;
    this.router.navigate([route]);
  }

  isLoading: boolean = false;
  communityID: number = 0;
  ngOnInit() {
    this.loaderService.isLoading$.subscribe((isLoading) => {
      this.isLoading = isLoading;
    });
    this.communityDataService.communityID$.subscribe((id) => {
      this.communityID = id;
    });
    this.getCategoriesInCommunity();
  }

  categories: CommunityCategory[] = [];
  categoryChartOptions: any;
  getCategoriesInCommunity() {
    this.httpService.getCategories(this.communityID).subscribe({
      next: (data: any) => {
        this.categories = data;
        this.updateCategoriesChartOptions();
      },
      error: (error: Error) => {
        alert('Error has occured, ' + error.message);
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
