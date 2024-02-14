// table.component.ts
import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectorRef,
} from '@angular/core';
import { Inject } from '@angular/core';
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent {
  @Input() displayedColumns: string[] = [];
  @Input() displayedNames: string[] = [];
  @Input() dataSource: any = [];
  @Input() icons?: string[];
  @Output() iconClick: EventEmitter<{ icon: string; data: any }> =
    new EventEmitter();
  constructor(private cdRef: ChangeDetectorRef) {}
  onIconClick(icon: string, data: any): void {
    // this.iconClick.emit({ icon, data });
    this.iconClick.emit({ icon, data });
  }

  ngOnInit(): void {
    // this.dataSource = this.dataService.dataSource$;
  }

  private formatDate(dateString: string | null): string {
    if (!dateString) {
      return ''; // Handle null or undefined dates as needed
    }

    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  }
}
