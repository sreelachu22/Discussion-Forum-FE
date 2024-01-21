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
import { CommunityPageComponent } from './components/layout/community-page/community-page.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpService } from './service/http.service';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { CategoryManagementComponent } from './components/layout/category-management/category-management.component';

@NgModule({
  declarations: [
    AppComponent,
    IconComponent,
    SidenavComponent,
    CardComponent,
    HeaderComponent,
    CommunityPageComponent,
    CategoryManagementComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    HttpClientModule,
    BsDatepickerModule,
    TooltipModule,
  ],
  providers: [HttpService],
  bootstrap: [AppComponent],
})
export class AppModule {}
