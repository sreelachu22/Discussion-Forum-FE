import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-notice-list',
  templateUrl: './notice-list.component.html',
  styleUrls: ['./notice-list.component.css'],
})
export class NoticeListComponent {
  @Input() sections: {
    title: string;
    metadataItems: {
      name: string;
      value?: any;
      isHtml?: boolean;
      style?: object;
      icon?: string;
    }[];
  }[] = [];
  @Input() click!: () => void;

  onClick() {
    this.click();
  }
  plainText(value: any): string {
    return value.toString(); // Or implement any logic to convert value to string
  }
  defaultStyle = {
    /*default styles here */
  };
}
