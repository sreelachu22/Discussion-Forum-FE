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
   //INPUT SETTER, A PROPERTY DECORATOR
  // When the 'collapsed' input property changes,
  // Angular invokes this setter to update the 'sideNavCollapsed' signal.

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
      icon: 'announcement',
      label: 'Notices',
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
}
