// list.component.ts
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent {
  @Input() sections: {
    title: string;
    metadataItems: { name?: string; value: any; isHtml?: boolean }[];
  }[] = [];
  @Input() click!: () => void;

  onClick() {
    this.click();
  }
  plainText(value: any): string {
    return value.toString(); // Or implement any logic to convert value to string
  }
}
