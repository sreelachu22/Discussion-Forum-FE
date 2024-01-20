import { Component } from '@angular/core';
import { navigationData } from './sidenav_data';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent {
  navigationOptions = navigationData;
}
