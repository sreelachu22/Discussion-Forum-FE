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
  @Output() sortSelectionChange = new EventEmitter<string>();

  sortSelection: string = '';
  onToggleChange(event: any) {
    this.sortSelection = event.value;
    this.sortSelectionChange.emit(this.sortSelection);
  }

  getOptionLabel(option: string): string {
    switch (option) {
      case 'communityCategoryName':
        return 'Category';
      case 'description':
        return 'Description';
      case 'createdAt':
        return 'Created At';
      default:
        return option;
    }
  }
}