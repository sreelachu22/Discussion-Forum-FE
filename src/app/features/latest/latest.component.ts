import { Component, OnInit } from '@angular/core';
import { LatestService } from 'src/app/service/HttpServices/latest.service';
import { ThreadFormatDatePipe } from 'src/app/pipe/thread-dateFormat.pipe';

@Component({
  selector: 'app-latest',
  templateUrl: './latest.component.html',
  styleUrls: ['./latest.component.css']
})
export class LatestComponent implements OnInit{
  sortOptions = ['Vote', 'Latest'];  
  breadcrumbs = [
    { label: 'Home', route: '/home' },        
    {
      label: 'Latest',
      route: '/latest'
    }
  ];
  latestPosts: any[] = [];
   communityCategoryID:number = 1;
   sortType:string = "vote";
   postCount:number = 10;
  constructor(private latestService: LatestService) { } // Inject your service
 

  ngOnInit(): void {
    this.subscribeToLatestPosts(); 
  }

  subscribeToLatestPosts() {    
    this.latestService.getLatest(this.communityCategoryID, this.sortType, this.postCount)
      .subscribe((data: any) => {
        this.latestPosts = data;
      });
  }
  onSortSelectionChange(sortOption:string){
    this.sortType = sortOption;
    this.subscribeToLatestPosts();
  }
}
