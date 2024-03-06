import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-edit-input-field',
  templateUrl: './edit-input-field.component.html',
  styleUrls: ['./edit-input-field.component.css']
})
export class EditInputFieldComponent {
  @Input() placeholder: string = '';
  @Input() inputClass: string = '';
  @Output() inputChange = new EventEmitter<string>();

  constructor() {}

  OnInputChange(event: any) {
    this.inputChange.emit(event.target.value as string);
  }

  inputValue: string = '';
}
