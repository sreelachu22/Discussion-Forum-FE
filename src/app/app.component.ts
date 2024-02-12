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

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(
    private router: Router,
    private loaderService: LoaderService,
    private accountService: AccountsService
  ) {}
  isLogged: boolean = false;
  //this subscribes to the isLoading$ observable provided by the LoaderService.
  isLoading = false;
  ngOnInit(): void {
    this.accountService.isUserLoggedIn.subscribe((data) => {
      this.isLogged = data;
    });
    const token = sessionStorage.getItem('token');
    if (token != null) {
      // this.accountService. = token;
      // this.accountService.ResolveToken(this.azureReturn);
    } else {
      if (this.isLogged == false) {
        this.accountService.Logout();
      }
    }
    //the component subscribes to the isLoading$ observable provided by the LoaderService.
    //This subscription listens for changes in the loading state.
    this.loaderService.isLoading$.subscribe((isLoading) => {
      this.isLoading = isLoading;
    });
  }
}
