import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css'],
})
export class ButtonComponent {
  @Input() buttonClass: string = '';
  @Input() buttonName: string = '';
  @Output() buttonClick: EventEmitter<void> = new EventEmitter<void>();

  handleClick() {
    this.buttonClick.emit();
  }
  isCurrentPage(): boolean {
    return this.buttonClass.includes('current-page');
  }

  getButtonClass(): string {
    return this.isCurrentPage()
      ? 'Current_page ' + this.buttonClass
      : this.buttonClass;
  }
}
