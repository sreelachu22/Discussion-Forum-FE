import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent {
  // @Input() title: string = '';
  @Input() metadataItems: { name: string; value: any }[] = [];
  @Input() justifyPosition :string = "center";
  // @Input() width: string | null = null;
  // @Input() height: string | null = null;
  // @Input() minWidth: string = '300px'; // default min-width
  // @Input() minHeight: string = '150px'; // default min-height
  // @Input() backgroundColor: string =
  //   'linear-gradient(135deg, #46e8e0, #1d8d87)';
}
