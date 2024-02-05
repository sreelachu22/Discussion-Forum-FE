// list.component.ts
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent {
  // @Input() createdBy: string = '';
  // @Input() status: string = '';
  // @Input() createdOn: string = '';
  // @Input() post: string = '';
  // @Input() votes: number = 0;
  // @Input() tags: string = '';
  // @Input() isAnswered: boolean = false;
  // @Input() metadataItems: { name: string; value: any }[] = [];
  @Input() sections: { title: string; metadataItems: { name: string; value: any , isHtml?: boolean;}[] }[] = [];
  @Input() click!: () => void;

  onClick() {
    this.click();
  }
  plainText(value: any): string {
    return value.toString(); // Or implement any logic to convert value to string
  }
}
