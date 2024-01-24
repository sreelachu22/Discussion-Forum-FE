import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent {
  @Input() createdBy: string = '';
  @Input() status: string = '';
  @Input() createdOn: string = '';
  @Input() post: string = '';

  value = 'shankar';

  @Input()
  click!: () => void;

  onClick() {
    this.click();
  }
}
