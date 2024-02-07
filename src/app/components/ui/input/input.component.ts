import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
})
export class InputComponent {
  OnInputChange(event: any) {
    this.inputChange.emit(event.target.value as string);
  }
  @Input() placeholder: string = '';
  @Input() inputClass: string = '';
  @Output() inputChange = new EventEmitter<string>();

  constructor() {}
}
