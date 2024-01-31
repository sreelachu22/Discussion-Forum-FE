// list.component.ts
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
  @Input() votes: number = 0;
  @Input() tags: string = '';
  @Input() isAnswered: boolean = false;

  @Input() click!: () => void;

  onClick() {
    this.click();
  }
}
