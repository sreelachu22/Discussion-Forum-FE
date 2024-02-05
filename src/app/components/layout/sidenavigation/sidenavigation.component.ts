import { Component, computed, signal } from '@angular/core';
import { faUser } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sidenavigation',
  templateUrl: './sidenavigation.component.html',
  styleUrls: ['./sidenavigation.component.css']
})
export class SidenavigationComponent {
  collapsed = signal(false);  //signals
  sidenavWidth = computed(()=> this.collapsed()? '65px':'250px'); //also signals

  faUser = faUser;
  openUserProfile() {
    // method body to handle the user profile click
  }
}
