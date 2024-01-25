import { CommonModule } from '@angular/common';
import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MatButtonToggleModule} from '@angular/material/button-toggle';

/**
 * @title Basic button-toggles
 */
@Component({
  selector: 'button-toggle',
  templateUrl: 'button-toggle.component.html',
  standalone: true,
  imports: [MatButtonToggleModule, CommonModule],
})
export class ButtonToggleComponent { 
  
  @Input() sortOptions: string[] = [];
  @Output() sortSelectionChange = new EventEmitter<string>(); // Event emitter for output

  sortSelection: string = '';
  onToggleChange(event: any) {
    this.sortSelection = event.value;
    this.sortSelectionChange.emit(this.sortSelection); // Emit the selected value
  }
}