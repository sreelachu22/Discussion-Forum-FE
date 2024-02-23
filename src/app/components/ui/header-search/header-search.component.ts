import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header-search',
  templateUrl: './header-search.component.html',
  styleUrls: ['./header-search.component.css'],
})
export class HeaderSearchComponent {
  searchText: string = '';
  @Output() searchClicked: EventEmitter<string> = new EventEmitter<string>();

  onSearch() {
    this.searchClicked.emit(this.searchText);
  }
}
