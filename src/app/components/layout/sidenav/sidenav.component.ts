import { Component, EventEmitter, HostListener, Output } from '@angular/core';
import { navbarData} from './sidenav_data';
import {
  faBell,
  faBook,
  faClock,
  faHome,
  faSearch,
  faTrophy,
} from '@fortawesome/free-solid-svg-icons';
import { trigger, transition, style, animate, keyframes } from '@angular/animations';
interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter, :leave', [
        style({ opacity: 0 }),
        animate('350ms', style({ opacity: 1 })),
      ]),
    ]),
    trigger('rotate', [
      transition(':enter', [
        animate(
          '1000ms',
          keyframes([
            style({ transform: 'rotate(0deg)', offset: '0' }),
            style({ transform: 'rotate(2turn)', offset: '1' }),
          ])
        ),
      ]),
    ]),
  ],
})
export class SidenavComponent {
  @Output() onToggleSideNav: EventEmitter<SideNavToggle> = new EventEmitter();

  
  collapsed = true;
  screenWidth = 0;
  sidenavData = navbarData;

  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
  }
  //The ngOnInit method is implemented to initialize the screenWidth property with the initial window width.

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.screenWidth = event.target.innerWidth;
    this.checkScreenWidth();
  }
//listen for the 'resize' event on the window. When the window is resized, the onResize method is called to update the screenWidth property and check the screen width.
  toggleCollapse(): void {
    this.collapsed = !this.collapsed;
    this.emitToggleEvent();
  }
//oggling the collapsed property and emitting a toggle event using the onToggleSideNav EventEmitter.
  // closeSidenav(): void {
  //   this.collapsed = false;
  //   this.emitToggleEvent();
  // }

  private emitToggleEvent(): void {
    this.onToggleSideNav.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth });
  }
//The emitToggleEvent method emits a toggle event with the current collapsed and screenWidth values using the onToggleSideNav EventEmitter.
  private checkScreenWidth(): void {
    if (this.screenWidth <= 768) {
      // Adjust behavior for smaller screens if needed
    }
}}          
