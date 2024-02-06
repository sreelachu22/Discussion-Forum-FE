import { Component, Input, signal } from '@angular/core';

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
  @Input() set collapsed(val: boolean) {
    this.sideNavCollapsed.set(val);
  }
  menuItems = signal<MenuItem[]>([
    {
      icon: 'home',
      label: 'Home',
      routes: 'home',
    },
    // {
    //   icon: 'search',
    //   label: 'Search',
    //   routes: '/search',
    // },
    {
      icon: 'bolt',
      label: 'Latest',
      routes: '/latest',
    },
    {
      icon: 'notifications',
      label: 'Notifications',
      routes: 'notices',
    },
    {
      icon: 'leaderboard',
      label: 'Leaderboards',
      routes: '/leaderboards',
    },
    {
      icon: 'flag',
      label: 'Guidelines',
      routes: '/guidelines',
    },
  ]);
}
