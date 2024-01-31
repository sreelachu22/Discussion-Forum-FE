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
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { CommunityPageComponent } from './features/community-page/community-page.component';
import { CategoryService } from './service/HttpServices/category.service';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CommunityManagementDashboardComponent } from './components/layout/community-management-dashboard/community-management-dashboard.component';
import { ListComponent } from './components/ui/list/list.component';
import { CategoryThreadsComponent } from './components/layout/category-threads/category-threads.component';
import { ButtonComponent } from './components/ui/button/button.component';
import { CategoryManagementComponent } from './features/community_head/category-management/category-management.component';
import { CategoryCreateModalComponent } from './components/ui/category-create-modal/category-create-modal.component';
import { UserManagementComponent } from './features/user-management/user-management.component';
import { ButtonToggleComponent } from './components/ui/button-toggle/button-toggle.component';
import { HomePageComponent } from './features/home-page/home-page.component';
import { UserEditComponent } from './components/layout/user-edit/user-edit.component';
import { UserNoticesComponent } from './features/user/user-notices/user-notices.component';

import { computed, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SidenavigationComponent } from './components/layout/sidenavigation/sidenavigation.component';
import { SidenavCustomComponent } from './components/layout/sidenavigation/sidenav-custom/sidenav-custom.component';
import { AdminDashboardComponent } from './features/super_admin/admin-dashboard/admin-dashboard.component';
import { SuperadminCategoryManagementComponent } from './features/super_admin/superadmin-category-management/superadmin-category-management.component';
import { GuidelinesComponent } from './features/guidelines/guidelines.component';
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
    ButtonComponent,
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
  ],
  providers: [CategoryService],
  bootstrap: [AppComponent],
})
export class AppModule {}
