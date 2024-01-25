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

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private router: Router) {}
  // subscription: any;

  enableLoader = false;

  ngOnInit(): void {
    this.router.events.subscribe((routeEvent) => {
      if (routeEvent instanceof NavigationStart) {
        this.enableLoader = true;
      } else if (
        routeEvent instanceof NavigationEnd ||
        routeEvent instanceof NavigationCancel ||
        routeEvent instanceof NavigationError
      ) {
        this.enableLoader = false;
      }
    });
  }
}
