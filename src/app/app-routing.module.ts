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
import { LatestComponent } from './features/latest/latest.component';
import { ClosedThreadsComponent } from './features/community_head/closed-threads/closed-threads.component';
import { NotificationComponent } from './features/user/notification/notification.component';
import { AdminLoginComponent } from './features/admin-login/admin-login.component';
import { LoginComponent } from './features/login/login.component';
import { LogoutComponent } from './features/logout/logout.component';
import { UnauthorisedComponent } from './features/unauthorised/unauthorised.component';
import { AdminRouteGuard } from './guard/admin.guard';
import { SuperAdminRouteGuard } from './guard/superadmin.guard';
import { UserRouteGuard } from './guard/user.guard';
import { EditReplyComponent } from './features/user/edit-reply/edit-reply.component';
import { EditPostComponent } from './features/user/edit-post/edit-post.component';
import { MyPostsComponent } from './features/user/my-posts/my-posts.component';
import { BookmarksComponent } from './features/user/bookmarks/bookmarks.component';
import { Replies20Component } from './features/user/replies2.0/replies2.0.component';
import { TagsComponent } from './features/tags/tags.component';

const routes: Routes = [
  { path: 'logout', component: LogoutComponent },
  { path: 'login', component: AdminLoginComponent },
  { path: 'unauthorised', component: UnauthorisedComponent },
  {
    component: HomePageComponent,
    path: 'home',
    canActivate: [UserRouteGuard],
  },
  {
    component: AdminDashboardComponent,
    path: 'admin-dashboard',
    canActivate: [SuperAdminRouteGuard],
  },
  {
    path: 'admin-dashboard',
    children: [
      {
        component: SuperadminCategoryManagementComponent,
        path: 'admin-category-management',
      },
    ],
    canActivate: [SuperAdminRouteGuard],
  },
  {
    component: CommunityPageComponent,
    path: 'community',
    canActivate: [UserRouteGuard],
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
    canActivate: [UserRouteGuard],
  },
  {
    component: CommunityManagementDashboardComponent,
    path: 'community-management-dashboard',
    canActivate: [AdminRouteGuard],
  },
  {
    path: 'community-management-dashboard',
    children: [
      {
        path: 'category-management',
        component: CategoryManagementComponent,
      },
    ],
    canActivate: [AdminRouteGuard],
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
    canActivate: [AdminRouteGuard],
  },
  {
    path: 'community-management-dashboard',
    children: [
      {
        path: 'user-management',
        component: UserManagementComponent,
      },
      {
        path: 'user-management/user-edit',
        component: UserEditComponent,
      },
      {
        path: 'closed-threads',
        component: ClosedThreadsComponent,
      },
    ],
    canActivate: [AdminRouteGuard],
  },
  {
    path: 'community-management-dashboard',
    children: [
      {
        path: 'notice-management',
        component: NoticesComponent,
      },
    ],
    canActivate: [AdminRouteGuard],
  },
  {
    component: UserNoticesComponent,
    path: 'notices',
    canActivate: [UserRouteGuard],
  },
  {
    component: LeaderboardComponent,
    path: 'leaderboards',
    canActivate: [UserRouteGuard],
  },
  {
    component: GuidelinesComponent,
    path: 'guidelines',
    canActivate: [UserRouteGuard],
  },
  {
    component: CreatePostComponent,
    path: 'category-posts/create-posts',
    canActivate: [UserRouteGuard],
  },
  {
    component: EditPostComponent,
    path: 'category-posts/edit-posts',
    canActivate: [UserRouteGuard],
  },
  {
    component: CreateReplyComponent,
    path: 'thread-replies/post-reply',
    canActivate: [UserRouteGuard],
  },
  {
    component: EditReplyComponent,
    path: 'thread-replies/edit-reply',
    canActivate: [UserRouteGuard],
  },
  {
    component: TagsComponent,
    path: 'latest',
    canActivate: [UserRouteGuard],
  },
  {
    component: NotificationComponent,
    path: 'notifications',
    canActivate: [UserRouteGuard],
  },
  {
    component: MyPostsComponent,
    path: 'my-posts',
    canActivate: [UserRouteGuard],
  },
  {
    component: BookmarksComponent,
    path: 'bookmarks',
    canActivate: [UserRouteGuard],
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
