import { Component } from '@angular/core';
import { navigationData } from './sidenav_data';
import {
  faBell,
  faBook,
  faClock,
  faHome,
  faSearch,
  faTrophy,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],
})
export class SidenavComponent {
  navigationOptions = navigationData;
  iconItems_list = [faHome, faSearch, faClock, faBell, faTrophy, faBook];
}
