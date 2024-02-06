import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryManagementComponent } from './features/community_head/category-management/category-management.component';
import { CategoryThreadsComponent } from './features/user/category-threads/category-threads.component';
import { CommunityPageComponent } from './features/user/community-page/community-page.component';
import { CommunityManagementDashboardComponent } from './features/community_head/community-management-dashboard/community-management-dashboard.component';
import { UserManagementComponent } from './features/community_head/user-management/user-management.component';
import { NoticesComponent } from './features/community_head/notices/notices.component';
import { HomePageComponent } from './features/home-page/home-page.component';
import { UserNoticesComponent } from './features/user/user-notices/user-notices.component';
import { AdminDashboardComponent } from './features/super_admin/admin-dashboard/admin-dashboard.component';
import { SuperadminCategoryManagementComponent } from './features/super_admin/superadmin-category-management/superadmin-category-management.component';
import { GuidelinesComponent } from './features/guidelines/guidelines.component';
import { CreatePostComponent } from './features/user/create-post/create-post.component';
import { SearchResultComponent } from './features/user/search-result/search-result.component';
import { UserEditComponent } from './features/community_head/user-edit/user-edit.component';
import { LeaderboardComponent } from './features/leaderboard/leaderboard.component';
import { ThreadRepliesComponent } from './features/user/thread-replies/thread-replies.component';
import { CategoryEditModalComponent } from './components/ui/category-edit-modal/category-edit-modal.component';

const routes: Routes = [
  {
    component: HomePageComponent,
    path: 'home',
  },
  {
    component: AdminDashboardComponent,
    path: 'admin-dashboard',
  },
  {
    component: SuperadminCategoryManagementComponent,
    path: 'admin-dashboard/admin-category-management',
  },
  {
    component: CommunityPageComponent,
    path: 'community',
  },
  { component: SearchResultComponent, path: 'search-results' },
  {
    path: 'community',
    children: [
      {
        path: 'category-posts',
        component: CategoryThreadsComponent,
      },
      {
        path: 'post-replies',
        component: ThreadRepliesComponent,
      },
    ],
  },
  {
    component: CommunityManagementDashboardComponent,
    path: 'community-management-dashboard',
  },
  {
    path: 'community-management-dashboard',
    children: [
      {
        path: 'category-management',
        component: CategoryManagementComponent,
      },
    ],
  },
  {
    path: 'community-management-dashboard',
    children: [
      {
        path: 'category-management',
        component: CategoryManagementComponent,
      },
      {
        path: 'category-management/category-edit/:categoryID',
        component: CategoryEditModalComponent,
      },
    ],
  },
  {
    path: 'community-management-dashboard',
    children: [
      {
        path: 'user-management',
        component: UserManagementComponent,
      },
      {
        path: 'user-management/user-edit/:userID',
        component: UserEditComponent,
      },
    ],
  },
  {
    path: 'community-management-dashboard',
    children: [
      {
        path: 'notice-management',
        component: NoticesComponent,
      },
    ],
  },
  {
    component: UserNoticesComponent,
    path: 'notices',
  },
  {
    component: LeaderboardComponent,
    path: 'leaderboards',
  },
  { component: GuidelinesComponent, path: 'guidelines' },
  {
    component: CreatePostComponent,
    path: 'category-posts/create-posts',
  },
  {
    component: HomePageComponent,
    path: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
