import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
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
    private searchService: searchService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadTags();
    sessionStorage.setItem('categoryName', "Category");
  }

  loadTags(): void {
    this.tagService.getAllTags().subscribe({
      next: (data: any[]) => {
        // Map each tag to include count in the name
        this.tags = data.map(tag => ({ name: tag.tagName, value: `used in ${tag.tagCount} posts` }));
  
        // Sort the tags array based on tagCount in descending order
        this.tags.sort((a: { tagCount: number; }, b: { tagCount: number; }) => b.tagCount - a.tagCount);
  
        // Select the first 12 tags
        this.tags = this.tags.slice(0, 12);
  
      },
      error: (error: Error) => {
        console.log('Error fetching tags', error);
      }
    });
  }

  getTaggedThreads(tagName: string) {
    this.router.navigate([`/tags/tag-threads/${tagName}`]); // Assuming you want to navigate to a specific tagged thread
  }
}
