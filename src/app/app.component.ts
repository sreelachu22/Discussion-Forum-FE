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

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private router: Router, private loaderService: LoaderService) {}

  //this subscribes to the isLoading$ observable provided by the LoaderService.
  isLoading = false;
  ngOnInit(): void {
    //the component subscribes to the isLoading$ observable provided by the LoaderService.
    //This subscription listens for changes in the loading state.
    this.loaderService.isLoading$.subscribe((isLoading) => {
      this.isLoading = isLoading;
    });
  }
}
