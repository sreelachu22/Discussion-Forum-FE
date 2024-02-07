import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent {
  // @Input() title: string = '';
  @Input() metadataItems: {
    name?: string;
    value: any;
    style?: object;
    imageSrc?: string;
  }[] = [];
  @Input() defaultImageWidth: string = '25px'; // Set your default width value
  @Input() defaultImageHeight: string = '25px'; // Set your default height value
  @Input() marginTop: string = '0px';
  @Input() justifyPosition: string = 'center';
  defaultStyle = {
    /*default styles here */
  };
}
