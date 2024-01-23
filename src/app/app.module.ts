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
import { CommunityPageComponent } from './features/community-page/community-page.component';
import { NoticesComponent } from './features/community_head/notices/notices.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { HttpService } from './service/http.service';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { CategoryManagementComponent } from './features/community_head/category-management/category-management.component';
import { CategoryCreateModalComponent } from './components/ui/category-create-modal/category-create-modal.component';
import { UserManagementComponent } from './features/user-management/user-management.component';


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
    CategoryCreateModalComponent,
    UserManagementComponent,
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
    FormsModule,
  ],
  providers: [HttpService],
  bootstrap: [AppComponent],
})
export class AppModule {}
