import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { searchService } from 'src/app/service/HttpServices/search.service';

@Component({
  selector: 'app-tag-threads',
  templateUrl: './tag-threads.component.html',
  styleUrls: ['./tag-threads.component.css'],
})
export class TagThreadsComponent implements OnInit {
  tagName: string = '';
  threads: any = [];

  constructor(
    private route: ActivatedRoute,
    private searchService: searchService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.tagName = params['tagName'];
      //console.log('Tag name:', this.tagName);
    });
    this.getTaggedThreads(this.tagName);
  }
  getTaggedThreads(tagName: string) {
    this.searchService.searchThreads(tagName, 1, 40).subscribe({
      next: (data: any) => {
        this.threads = data;
        console.log(this.threads.searchThreadDtoList);
      },
    });
  }

  navigateToThreadReplies(threadID: number) {
    this.router.navigate([`/community/post-replies`], {
      queryParams: { threadID: threadID },
    });
  }

  formatDate(date: string | null): string {
    if (!date) {
      return 'N/A';
    }

    const currentDate = new Date();
    const inputDate = new Date(date);

    const timeDifference = currentDate.getTime() - inputDate.getTime();
    const secondsDifference = Math.floor(timeDifference / 1000);
    const minutesDifference = Math.floor(secondsDifference / 60);
    const hoursDifference = Math.floor(minutesDifference / 60);
    const daysDifference = Math.floor(hoursDifference / 24);

    if (daysDifference > 3) {
      return (
        'on ' +
        inputDate.toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        })
      );
    } else if (hoursDifference >= 1) {
      return `${hoursDifference} ${
        hoursDifference === 1 ? 'hour' : 'hours'
      } ago`;
    } else if (minutesDifference >= 1) {
      return `${minutesDifference} ${
        minutesDifference === 1 ? 'minute' : 'minutes'
      } ago`;
    } else {
      return '1 minute ago';
    }
  }
}
