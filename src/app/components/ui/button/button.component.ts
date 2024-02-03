import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent {

  @Input() buttonClass: string = '';
  @Input() buttonName: string = '';
  @Input() buttonColor: string = '';
  @Input() defaultColor: string = 'rgb(31, 151, 145)';
  @Input() textColor: string = '';
  @Input() hoverColor: string = '';
  @Input() hoverTextColor: string = '';
  @Input() defaultTextColor: string = '#ffffff';
  @Input() disableButton: boolean | null= false;
  @Output() buttonClick: EventEmitter<void> = new EventEmitter<void>();
  hover: boolean = false;

  // The buttonClass and buttonName are input properties, 
  // while buttonClick is an output property emitting an event when button is clicked.
  handleClick() {
    this.buttonClick.emit();
  }

}
