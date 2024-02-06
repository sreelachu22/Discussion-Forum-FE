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
import { CreateReplyComponent } from './features/user/create-reply/create-reply.component';

const routes: Routes = [
  {
    component: HomePageComponent,
    path: 'home_page',
  },
  {
    component: AdminDashboardComponent,
    path: 'admin_dashboard_page',
  },
  {
    component: SuperadminCategoryManagementComponent,
    path: 'admin_dashboard_page/superadmin_category_management',
  },
  {
    component: CommunityPageComponent,
    path: 'community_page',
  },
  { component: SearchResultComponent, path: 'search-result' },
  {
    component: CategoryThreadsComponent,
    path: 'category_threads',
  },
  {
    component: ThreadRepliesComponent,
    path: 'thread-replies',
  },
  {
    component: CommunityManagementDashboardComponent,
    path: 'community_management_dashboard',
  },
  {
    path: 'community_management_dashboard',
    children: [
      {
        path: 'category-management',
        component: CategoryManagementComponent,
      },
    ],
  },
  {
    path: 'community_management_dashboard',
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
    path: 'community_management_dashboard',
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
    path: 'community_management_dashboard',
    children: [
      {
        path: 'notice-management',
        component: NoticesComponent,
      },
    ],
  },
  {
    component: UserNoticesComponent,
    path: 'user-notices',
  },
  {
    component: LeaderboardComponent,
    path: 'leaderboards',
  },
  { component: GuidelinesComponent, path: 'guidelines' },
  {
    component: CreatePostComponent,
    path: 'category_threads/create_posts',
  },
  {
    component: CreateReplyComponent,
    path: 'thread-replies/post-reply',
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
