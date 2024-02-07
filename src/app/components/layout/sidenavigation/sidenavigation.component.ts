import { Component, computed, signal } from '@angular/core';
import { faUser } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sidenavigation',
  templateUrl: './sidenavigation.component.html',
  styleUrls: ['./sidenavigation.component.css'],
})
export class SidenavigationComponent {
  collapsed = signal(false); //signals which will pass the state with the parent component
  //Automatically update the sidenav width according to the collapsed state
  sidenavWidth = computed(() => (this.collapsed() ? '65px' : '250px'));

  faUser = faUser;
  // openUserProfile() {
  //   // method body to handle the user profile click
  // }
  // getLogoPath(): string {
  //   return 'logo.png'; // Adjust the path as needed
  // }
}
