import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-dropdown-select',
  templateUrl: 'dropdown-select.component.html',
  styleUrls: ['dropdown-select.component.css']
})
export class DropdownSelectComponent {
  @Input() dropdownOptions: string[] = [];
  @Output() optionSelected: EventEmitter<string> = new EventEmitter<string>();

  selectOption(option: string) {
    this.optionSelected.emit(option);
  }
}
