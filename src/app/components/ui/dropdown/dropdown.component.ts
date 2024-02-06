import { Component, Output, EventEmitter, Input } from '@angular/core';
import { Thread } from '../search/search.component';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css'],
})
export class DropdownComponent {
  @Input() results: Thread[] = [];
  @Output() emitselectResult: EventEmitter<Thread> = new EventEmitter<Thread>();

  constructor() {} // Inject ElementRef

  selectResult(result: Thread) {
    this.emitselectResult.emit(result);
  }
}