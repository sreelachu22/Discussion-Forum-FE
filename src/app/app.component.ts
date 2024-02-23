import { Component, OnInit } from '@angular/core';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
  RouterEvent,
} from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LoaderService } from './service/HttpServices/loader.service';
import { faL } from '@fortawesome/free-solid-svg-icons';
import { AccountsService } from './service/HttpServices/account.service';
import {
  SingleUser,
  UserEditComponent,
} from './features/community_head/user-edit/user-edit.component';
import { UserEditService } from './service/HttpServices/user-edit.service';
import { NotificationService } from './service/HttpServices/notification.service';
import { environment } from './environments/environment';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(
    private router: Router,
    private loaderService: LoaderService,
    private accountService: AccountsService,
    private userService: UserEditService,
    private notificationService: NotificationService
  ) {}
  isLogged: boolean = false;
  //this subscribes to the isLoading$ observable provided by the LoaderService.
  isLoading = false;
  userID: string | null = '';

  ngOnInit(): void {
    //the component subscribes to the isLoading$ observable provided by the LoaderService.
    //This subscription listens for changes in the loading state.
    this.loaderService.isLoading$.subscribe((isLoading) => {
      this.isLoading = isLoading;
    });
    this.accountService.isUserLoggedIn.subscribe((data) => {
      this.isLogged = data;
    });
    this.userID = sessionStorage.getItem('userID');
    this.notificationService.getNotificationCount(this.userID);
    const token = sessionStorage.getItem('token');
    if (token == null) {
      if (this.isLogged == false) {
        this.accountService.Logout();
      }
    }
  }
}
