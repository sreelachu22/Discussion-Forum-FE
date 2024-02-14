import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-breadcrumb-button',
  templateUrl: './breadcrumb-button.component.html',
  styleUrls: ['./breadcrumb-button.component.css']
})
export class BreadcrumbButtonComponent {
  @Input() buttonName:string = "";
  @Input() buttonClass:string = "";
  @Input() buttonColor:string = "";
  @Input() textColor:string = "";
  @Input() hoverColor:string = "";
  @Input() hoverTextColor:string = "";
  @Input() breadcrumbs: { label: string, route: string }[] = [];
  @Output() buttonClick: EventEmitter<void> = new EventEmitter<void>();

  handleButtonClick(){
      this.buttonClick.emit();
    }
}
