import { Component, OnInit } from '@angular/core';
import { searchService } from 'src/app/service/HttpServices/search.service';
import { TagService } from 'src/app/service/HttpServices/tag.service';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css'],
})
export class TagsComponent implements OnInit {
  sortOrder: string = 'asc';
  currentPage: number = 1;
  pageCount: number = 1;
  tags: any = [];
  threads: any = [];

  constructor(
    private tagService: TagService,
    private searchService: searchService
  ) {}

  ngOnInit(): void {
    this.loadTags();
  }

  loadTags(): void {
    this.tagService
      .getTagsWithSearchAndSort(this.sortOrder, this.currentPage)
      .subscribe({
        next: (data: any) => {
          this.tags = data.tagDtos;
          this.pageCount = data.totalPages;
        },
        error: (error: Error) => {
          console.log('Error has occurred' + error.message);
        },
      });
  }

  nextPage() {
    if (this.currentPage <= this.pageCount - 1) {
      this.currentPage++;
      this.loadTags();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadTags();
    }
  }

  getTaggedThreads(tagName: string) {
    console.log('hi');
    this.searchService.searchThreads(tagName, 1, 40).subscribe({
      next: (data: any) => {
        this.threads = data;
        console.log(this.threads.searchThreadDtoList);
      },
    });
  }
}
