import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-edit-input-field',
  templateUrl: './edit-input-field.component.html',
  styleUrls: ['./edit-input-field.component.css']
})
export class EditInputFieldComponent implements AfterViewInit {
  @Input() placeholder: string = '';
  @Input() inputClass: string = '';
  @Output() inputChange = new EventEmitter<string>();

  @ViewChild('inputField') inputField!: ElementRef;

  inputValue: string = '';

  constructor() {}

  ngAfterViewInit() {
    this.setFocus();
  }

  onInputChange(event: any) {
    const value = event.target.value as string;
    this.inputValue = value;
    this.inputChange.emit(value);
  }

  onFocusOut() {
    if (!this.inputValue) {
      this.inputChange.emit(this.placeholder);
    }
  }

  private setFocus() {
    if (this.inputField) {
      this.inputField.nativeElement.focus();
    }
  }
}
