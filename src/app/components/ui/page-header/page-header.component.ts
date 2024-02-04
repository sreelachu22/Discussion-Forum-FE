import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.css'],
})
export class PageHeaderComponent {
  showButton: boolean = true;
  showText: boolean = true;

  @Input() navClass: string = '';
  @Input() categoryName: string = '';

  onButtonClick() {
    this.createPostClicked.emit();
  }

  @Output() createPostClicked = new EventEmitter<void>();
}
