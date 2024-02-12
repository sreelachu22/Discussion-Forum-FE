import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IconComponent } from './components/ui/icon/icon.component';
import { SidenavComponent } from './components/layout/sidenav/sidenav.component';
import { HeaderComponent } from './components/layout/header/header.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CardComponent } from './components/ui/card/card.component';
import { NoticesComponent } from './features/community_head/notices/notices.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { CommunityPageComponent } from './features/user/community-page/community-page.component';
import { CategoryService } from './service/HttpServices/category.service';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CommunityManagementDashboardComponent } from './features/community_head/community-management-dashboard/community-management-dashboard.component';
import { ListComponent } from './components/ui/list/list.component';
import { CategoryThreadsComponent } from './features/user/category-threads/category-threads.component';
import { CategoryManagementComponent } from './features/community_head/category-management/category-management.component';
import { CategoryCreateModalComponent } from './components/ui/category-create-modal/category-create-modal.component';
import { UserManagementComponent } from './features/community_head/user-management/user-management.component';
import { ButtonToggleComponent } from './components/ui/button-toggle/button-toggle.component';
import { HomePageComponent } from './features/home-page/home-page.component';
import { UserEditComponent } from './features/community_head/user-edit/user-edit.component';
import { UserNoticesComponent } from './features/user/user-notices/user-notices.component';
import { computed, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { DateFormatPipe } from './pipe/date-format.pipe';
import { SidenavigationComponent } from './components/layout/sidenavigation/sidenavigation.component';
import { SidenavCustomComponent } from './components/layout/sidenavigation/sidenav-custom/sidenav-custom.component';
import { AdminDashboardComponent } from './features/super_admin/admin-dashboard/admin-dashboard.component';
import { SuperadminCategoryManagementComponent } from './features/super_admin/superadmin-category-management/superadmin-category-management.component';
import { GuidelinesComponent } from './features/guidelines/guidelines.component';
import { SearchResultComponent } from './features/user/search-result/search-result.component';
import { CreatePostComponent } from './features/user/create-post/create-post.component';
import { EditorModule } from '@tinymce/tinymce-angular';
import { SuccessPopupComponent } from './components/ui/success-popup/success-popup.component';
import { LeaderboardComponent } from './features/leaderboard/leaderboard.component';
import { LoaderComponent } from './features/loader/loader.component';
import { LoaderInterceptor } from './interceptor/loader.interceptor';
import { LoaderService } from './service/HttpServices/loader.service';
import { ThreadRepliesComponent } from './features/user/thread-replies/thread-replies.component';
import { ThreadReplyComponent } from './components/ui/thread-reply/thread-reply.component';
import { BreadcrumbsComponent } from './components/ui/breadcrumbs/breadcrumbs.component';
import { BreadcrumbButtonComponent } from './components/ui/breadcrumb-button/breadcrumb-button.component';
import { NestedRepliesComponent } from './features/user/nested-replies/nested-replies.component';
import { CategoryCardComponent } from './components/ui/category-card/category-card.component';
import { TableComponent } from './components/ui/table/table.component';
import { CategoryEditModalComponent } from './components/ui/category-edit-modal/category-edit-modal.component';
import { InputComponent } from './components/ui/input/input.component';
import { SearchComponent } from './components/ui/search/search.component';
import { PageHeaderComponent } from './components/ui/page-header/page-header.component';
import { TextComponent } from './components/ui/text/text.component';
import { PaginationComponent } from './components/ui/pagination/pagination.component';
import { ReplyListComponent } from './components/ui/reply-list/reply-list.component';
import { TimeDifferencePipe } from './pipe/time-difference.pipe';
import { DeleteModalComponent } from './components/ui/delete-modal/delete-modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DropdownComponent } from './components/ui/dropdown/dropdown.component';
import { EditorComponent } from './components/ui/editor/editor.component';
import { NoticeCreateModalComponent } from './components/ui/notice-create-modal/notice-create-modal.component';
import { ButtonComponent } from './components/ui/button/button.component';
import { CreateReplyComponent } from './features/user/create-reply/create-reply.component';
import { NoticeUpdateModalComponent } from './components/ui/notice-update-modal/notice-update-modal.component';
import { NoticesService } from './service/HttpServices/notices.service';
import { NoticeListComponent } from './components/ui/notice-list/notice-list.component';
import { LatestComponent } from './features/latest/latest.component';
import { ThreadFormatDatePipe } from './pipe/thread-dateFormat.pipe';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { BarChartComponent } from './components/ui/bar-chart/bar-chart.component';
import { InvalidPopupComponent } from './components/ui/invalid-popup/invalid-popup.component';
import { NotificationComponent } from './features/user/notification/notification.component';
import { NotficationListComponent } from './components/ui/notfication-list/notfication-list.component';
@NgModule({
  declarations: [
    AppComponent,
    IconComponent,
    SidenavComponent,
    CardComponent,
    HeaderComponent,
    NoticesComponent,
    CommunityPageComponent,
    CategoryManagementComponent,
    CommunityManagementDashboardComponent,
    ListComponent,
    CategoryThreadsComponent,
    CategoryCreateModalComponent,
    UserManagementComponent,
    HomePageComponent,
    UserEditComponent,
    UserNoticesComponent,
    SidenavigationComponent,
    SidenavCustomComponent,
    AdminDashboardComponent,
    SuperadminCategoryManagementComponent,
    GuidelinesComponent,
    SearchResultComponent,
    CreatePostComponent,
    SuccessPopupComponent,
    LeaderboardComponent,
    LoaderComponent,
    ThreadRepliesComponent,
    ThreadReplyComponent,
    BreadcrumbsComponent,
    BreadcrumbButtonComponent,
    NestedRepliesComponent,
    CategoryCardComponent,
    TableComponent,
    DateFormatPipe,
    CategoryEditModalComponent,
    InputComponent,
    SearchComponent,
    PageHeaderComponent,
    TextComponent,
    PaginationComponent,
    ReplyListComponent,
    TimeDifferencePipe,
    DropdownComponent,
    EditorComponent,
    ButtonComponent,
    NoticeCreateModalComponent,
    DeleteModalComponent,
    CreateReplyComponent,
    NoticeUpdateModalComponent,
    NoticeListComponent,
    LatestComponent,
    ThreadFormatDatePipe,
    BarChartComponent,
    InvalidPopupComponent, 
    NotificationComponent, 
    NotficationListComponent   
  ],

  imports: [
    ModalModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ModalModule.forRoot(),
    BsDatepickerModule.forRoot(),
    TooltipModule,
    ButtonToggleComponent,
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    EditorModule,
    ReactiveFormsModule,
    CanvasJSAngularChartsModule,
  ],
  providers: [
    CategoryService,
    LoaderService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
