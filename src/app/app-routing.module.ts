import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryManagementComponent } from './features/community_head/category-management/category-management.component';
import { CategoryThreadsComponent } from './components/layout/category-threads/category-threads.component';
import { CommunityPageComponent } from './features/community-page/community-page.component';
import { CommunityManagementDashboardComponent } from './components/layout/community-management-dashboard/community-management-dashboard.component';
import { UserManagementComponent } from './features/user-management/user-management.component';
import { NoticesComponent } from './features/community_head/notices/notices.component';
import { HomePageComponent } from './features/home-page/home-page.component';
import { UserNoticesComponent } from './features/user/user-notices/user-notices.component';

const routes: Routes = [
  {
    component: HomePageComponent,
    path: 'home_page',
  },
  {
    component: CommunityPageComponent,
    path: 'community_page',
  },
  {
    component: CategoryThreadsComponent,
    path: 'category_threads',
  },
  {
    component: CommunityManagementDashboardComponent,
    path: 'community_management_dashboard',
  },
  {
    component: CategoryManagementComponent,
    path: 'community-management/category-management',
  },
  {
    component: UserManagementComponent,
    path: 'community-management/user-management',
  },
  {
    component: NoticesComponent,
    path: 'community-management/notice-management',
  },
  {
    component: UserNoticesComponent,
    path: 'user-notices',
  },
  {
    component: HomePageComponent,
    path: '',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      enableTracing: true,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
