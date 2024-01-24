// category-threads.component.ts
import { Component, OnInit } from '@angular/core';
import { ThreadService } from 'src/app/thread.service';

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

  constructor(private threadService: ThreadService) {}

  ngOnInit() {
    this.threadService.getThread(1).subscribe({
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
}
