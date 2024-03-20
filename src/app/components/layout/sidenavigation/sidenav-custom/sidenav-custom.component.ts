import { Component, Input, signal } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { TokenHandler } from 'src/app/util/tokenHandler';
import Swal from 'sweetalert2';
import {
  MSAL_GUARD_CONFIG,
  MsalBroadcastService,
  MsalGuardConfiguration,
  MsalService,
} from '@azure/msal-angular';
import { AccountsService } from 'src/app/service/HttpServices/account.service';
import { environment } from 'src/app/environments/environment';
import { Subscription, interval, takeWhile, timer } from 'rxjs';

export type MenuItem = {
  icon: string;
  label: string;
  routes: string;
};

@Component({
  selector: 'app-sidenav-custom',
  templateUrl: './sidenav-custom.component.html',
  styleUrls: ['./sidenav-custom.component.css'],
})
export class SidenavCustomComponent {
  sideNavCollapsed = signal(false);
  constructor(
    private router: Router,
    private tokenHandler: TokenHandler,
    private authService: MsalService,
    private accountService: AccountsService
  ) {}
  @Input() set collapsed(val: boolean) {
    this.sideNavCollapsed.set(val);
  }
  private visitedAnnouncements = false; // Flag to track if the user has visited announcements
  private timerSubscription: Subscription | undefined;

  menuItems = signal<MenuItem[]>([
    {
      icon: 'home',
      label: 'Home',
      routes: 'home',
    },
    {
      icon: 'bolt',
      label: 'Latest',
      routes: 'latest',
    },
    {
      icon: 'tag',
      label: 'Trending',
      routes: 'tags',
    },
    {
      icon: 'announcement',
      label: 'Announcements',
      routes: 'notices',
    },
    {
      icon: 'leaderboard',
      label: 'Leaderboard',
      routes: '/leaderboards',
    },
    {
      icon: 'flag',
      label: 'Guidelines',
      routes: '/guidelines',
    },
  ]);

  ngOnInit() {
    // Check if the reminder has been shown previously
    const reminderShown = sessionStorage.getItem('announcementReminderShown');

    // If not shown previously or user logs in again, show the reminder
    if (!reminderShown || reminderShown === 'false') {
      // Subscribe to router events to track navigation
      this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd && event.url === '/notices') {
          // If the user visits the announcements page, set visitedAnnouncements to true
          this.visitedAnnouncements = true;
          // Unsubscribe from timer if user visits announcements page
          if (this.timerSubscription) {
            this.timerSubscription.unsubscribe();
          }
        }
      });

      // Start a timer to remind users to check out announcements after 2 minutes if they haven't visited the announcements page
      this.timerSubscription = timer(60000) // 2 minutes in milliseconds
        .pipe(takeWhile(() => !this.visitedAnnouncements))
        .subscribe(() => {
          this.showAnnouncementReminder();
        });

      // Store that the reminder has been shown
      sessionStorage.setItem('announcementReminderShown', 'true');
    }
  }

  async showAnnouncementReminder() {
    // Show a SweetAlert2 modal to remind users to check out announcements
    Swal.fire({
      title: "Don't Miss Out!",
      html: `
        <div style="text-align: center;">
          <img src="assets/images/happy-face.png" alt="Announcement Image" style="max-width: 20%; height: auto;">
          <p style="margin-top: 10px; font-size: 16px; line-height: 1.5;">
            Hey there! <br>
            We hope you're having a great time on <b>Discussit!</b> <br> 🌟 <br>
            Don't miss out on the latest updates from your Community Admin - 
            head over to the <a href="notices" style="text-decoration:none;">Announcements page</a> now to discover what exciting news they have to share with you. <br>
            Let's keep the discussions going! 🚀
          </p>
        </div>
      `,
      confirmButtonText: 'OK',
      confirmButtonColor: 'rgb(51, 171, 165)',
    });
  }

}
