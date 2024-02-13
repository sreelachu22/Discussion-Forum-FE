import { Component, Output, EventEmitter, Input } from '@angular/core';
import { CategoryThreadDto, Thread } from '../search/search.component';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css'],
})
export class DropdownComponent {
  @Input() results: CategoryThreadDto[] = [];
  @Output() emitselectResult: EventEmitter<Thread> = new EventEmitter<Thread>();

  constructor() {}
  selectResult(result: any) {
    this.emitselectResult.emit(result);
  }
}
