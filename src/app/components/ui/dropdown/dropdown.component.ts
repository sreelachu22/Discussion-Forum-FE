import { Component, Output, EventEmitter, Input } from '@angular/core';
import { CategoryThreadDto, TagDto, Thread } from '../search/search.component';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css'],
})
export class DropdownComponent {
  @Input() results: any = [];
  @Output() emitselectResult: EventEmitter<Thread> = new EventEmitter<Thread>();

  constructor() {}
  selectResult(result: any) {
    this.emitselectResult.emit(result);
  }

  isCategoryThreadDto(result: any): result is CategoryThreadDto {
    return result && result.title !== undefined;
  }
}
