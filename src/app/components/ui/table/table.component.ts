// table.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Inject } from '@angular/core';
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent {
  @Input() displayedColumns: string[] = [];
  @Input() displayedNames: string[] = [];
  @Input() dataSource: any[] = [];
  @Input() icons?: string[];
  @Output() iconClick: EventEmitter<{ icon: string; data: any }> =
    new EventEmitter();

  onIconClick(icon: string, data: any): void {
    console.log('onIconClick called');
    this.iconClick.emit({ icon, data });
  }

  ngOnInit(): void {
    this.dataSource = this.dataSource.map((data) => {
      return {
        ...data,
        createdAt: this.formatDate(data.createdAt),
      };
    });
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
