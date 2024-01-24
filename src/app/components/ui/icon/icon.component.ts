import { Component, Input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  IconDefinition,
  faEdit,
  faEye,
  faHome,
} from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.css'],
})
export class IconComponent {
  // @Input()
  // iconName!: IconDefinition;
  @Input()
  iconName!: IconDefinition;
}
