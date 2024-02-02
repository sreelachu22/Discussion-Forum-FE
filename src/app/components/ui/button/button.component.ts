import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent {

  @Input() buttonClass: string = '';
  @Input() buttonName: string = '';
  @Output() buttonClick: EventEmitter<void> = new EventEmitter<void>();

  // The buttonClass and buttonName are input properties, 
  // while buttonClick is an output property emitting an event when button is clicked.
  handleClick() {
    this.buttonClick.emit();
  }

}
