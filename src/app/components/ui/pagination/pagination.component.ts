import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],
})
export class PaginationComponent implements OnChanges {
  showPrevious: boolean = true;
  showNext: boolean = true;
  pages: number[] = [];

  private _currentPage: number = 1;

  @Input()
  get currentPage(): number {
    return this._currentPage;
  }
  set currentPage(value: number) {
    this._currentPage = value;
    this.updatePageNumbers();
    this.showPrevious = this.currentPage > 1;
    this.showNext = this.currentPage < this.totalPages;
  }

  @Input() totalPages: number = 0;
  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();

  ngOnChanges(changes: SimpleChanges) {
    if (changes['currentPage']) {
      this.showPrevious = this.currentPage > 1;
      this.showNext = this.currentPage < this.totalPages;
    }
  }

  changePage(newPage: number) {
    if (newPage !== this.currentPage) {
      this.pageChange.emit(newPage);
    }
  }

  generatePageNumbers() {
    this.pages = [];
    const maxVisiblePages = 3;
    const startPage = Math.max(1, this.currentPage);
    const endPage = Math.min(startPage + maxVisiblePages - 1, this.totalPages);

    for (let i = startPage; i <= endPage; i++) {
      this.pages.push(i);
    }
  }

  updatePageNumbers() {
    const pagesToShow = Math.min(this.totalPages, 3);
    const startPage = Math.max(1, this.currentPage - 1);
    const endPage = Math.min(this.totalPages, startPage + pagesToShow - 1);

    this.pages = Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    );
  }

  ngOnInit() {
    this.generatePageNumbers();
  }
}
