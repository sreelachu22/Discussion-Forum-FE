// category-threads.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ThreadService } from 'src/app/service/HttpServices/thread.service';

interface Value {
  createdBy: string;
  threadStatus: string;
  createdAt: string | null;
  content: string;
}

@Component({
  selector: 'app-category-threads',
  templateUrl: './category-threads.component.html',
  styleUrls: ['./category-threads.component.css'],
})
export class CategoryThreadsComponent implements OnInit {
  value!: Value[];

  constructor(
    private threadService: ThreadService,
    private activateRoute: ActivatedRoute,
    private router: Router
  ) {}

  communityCategoryMappingID: number = 0;

  ngOnInit() {
    this.activateRoute.queryParams.subscribe((params) => {
      this.communityCategoryMappingID = params['communityCategoryMappingID'];
      // Now you have access to communityCategoryMappingID
      // Use it as needed in your component logic.
    });

    this.threadService.getThread(this.communityCategoryMappingID).subscribe({
      next: (data: Value[]) => {
        this.value = data;
        console.log(this.value);
      },
      error: (error: Error) => {
        console.log('Error', error);
      },
    });
  }

  formatDate(date: string | null): string {
    if (date) {
      // Your custom date formatting logic here
      return new Date(date).toLocaleDateString();
    } else {
      return 'N/A';
    }
  }

  createPost() {
    this.router.navigate(['category_threads/create_posts'], {
    });
  }
}
