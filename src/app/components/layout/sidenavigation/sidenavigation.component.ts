import { Component, computed, signal } from '@angular/core';

@Component({
  selector: 'app-sidenavigation',
  templateUrl: './sidenavigation.component.html',
  styleUrls: ['./sidenavigation.component.css']
})
export class SidenavigationComponent {
  collapsed = signal(false);  //signals
  sidenavWidth = computed(()=> this.collapsed()? '65px':'250px'); //also signals
}
