import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css'],
})
export class ButtonComponent {
  @Input() buttonClass: string = '';
  @Input() buttonName: string = '';
  @Input() buttonColor: string = '';
  @Input() defaultColor: string = '';
  @Input() textColor: string = '';
  @Input() hoverColor: string = '';
  @Input() hoverTextColor: string = '';
  @Input() buttonType : string =''
  @Input() defaultTextColor: string = '';
  @Input() disableButton: boolean | null = false;
  @Output() buttonClick: EventEmitter<void> = new EventEmitter<void>();
  hover: boolean = false;

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
