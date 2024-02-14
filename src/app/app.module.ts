import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IconComponent } from './components/ui/icon/icon.component';
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
import { ClosedThreadsComponent } from './features/community_head/closed-threads/closed-threads.component';
import { NotificationComponent } from './features/user/notification/notification.component';
import { NotficationListComponent } from './components/ui/notfication-list/notfication-list.component';
import { DropdownSelectComponent } from './components/ui/dropdown-select/dropdown-select.component';
import { MatSelectModule } from '@angular/material/select';
import { TagInputModule } from 'ngx-chips';
import { LoginComponent } from './features/login/login.component';
import {
  MsalGuard,
  MsalInterceptor,
  MsalBroadcastService,
  MsalInterceptorConfiguration,
  MsalModule,
  MsalService,
  MSAL_GUARD_CONFIG,
  MSAL_INSTANCE,
  MSAL_INTERCEPTOR_CONFIG,
  MsalGuardConfiguration,
  MsalRedirectComponent,
} from '@azure/msal-angular';
import {
  BrowserCacheLocation,
  Configuration,
  IPublicClientApplication,
  InteractionType,
  LogLevel,
  PublicClientApplication,
} from '@azure/msal-browser';
import { TokenInterceptor } from './interceptor/token.interceptor';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { TokenHandler } from './util/tokenHandler';
import { AdminLoginComponent } from './features/admin-login/admin-login.component';
import { LogoutComponent } from './features/logout/logout.component';
import { UnauthorisedComponent } from './features/unauthorised/unauthorised.component';
import { jwtDecode } from 'jwt-decode';
import { AccountsService } from './service/HttpServices/account.service';
import { ThreadViewComponent } from './components/ui/thread-view/thread-view.component';
import { ProfilePopupComponent } from './components/layout/profile-popup/profile-popup.component';
import { EditReplyComponent } from './features/user/edit-reply/edit-reply.component';
import { EditPostComponent } from './features/user/edit-post/edit-post.component';
import { HeaderSearchComponent } from './components/ui/header-search/header-search.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { environment } from './environments/environment';

const isIE =
  window.navigator.userAgent.indexOf('MSIE') > -1 ||
  window.navigator.userAgent.indexOf('Trident/') > -1;

@NgModule({
  declarations: [
    AppComponent,
    IconComponent,
    CardComponent,
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
    NotficationListComponent,
    ClosedThreadsComponent,
    DropdownSelectComponent,
    LoginComponent,
    AdminLoginComponent,
    LogoutComponent,
    UnauthorisedComponent,
    ThreadViewComponent,
    ProfilePopupComponent,
    EditReplyComponent,
    EditPostComponent,
    HeaderSearchComponent,
  ],

  imports: [
    MsalModule.forRoot(
      new PublicClientApplication({
        auth: {
          clientId: environment.msalConfig.clientId,
          redirectUri: environment.msalConfig.redirectUri,
          authority: environment.msalConfig.authority,
        },
        cache: {
          cacheLocation: environment.msalConfig.cacheLocation,
          storeAuthStateInCookie: isIE,
        },
      }),
      {
        interactionType: InteractionType.Redirect,
        authRequest: {
          scopes: ['user.read'],
        },
      },
      {
        interactionType: InteractionType.Redirect,
        protectedResourceMap: new Map([
          [environment.msalConfig.protectedResourceMap, ['user.Read']],
        ]),
      }
    ),
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
    MatSelectModule,
    TagInputModule,
    MsalModule,
    SweetAlert2Module.forRoot(),
    MatTooltipModule,
    BsDropdownModule.forRoot(),
  ],
  providers: [
    CategoryService,
    LoaderService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true,
    },
    MsalService,
    MsalGuard,
    MsalBroadcastService,
    TokenHandler,
    AccountsService,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent, MsalRedirectComponent],
})
export class AppModule {}
