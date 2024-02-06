import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.css'],
})
export class PageHeaderComponent {
  @Input() showButton: boolean = true;
  @Input() showText: boolean = true;

  @Input() navClass: string = '';
  @Input() pageHeaderTitle: string = '';
  @Input() ButtonName: string = '';
  @Input() ButtonClass: string = 'Functional_button';

  onButtonClick() {
    this.ButtonClick.emit();
  }

  @Output() ButtonClick = new EventEmitter<void>();
}
