import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/service/HttpServices/category.service';
import { LatestService } from 'src/app/service/HttpServices/latest.service';

@Component({
  selector: 'app-latest',
  templateUrl: './latest.component.html',
  styleUrls: ['./latest.component.css']
})
export class LatestComponent implements OnInit{
  sortOptions = ['Vote', 'Latest'];  
  parentDropdownOptions: string[] = [];
  categories:any[] = [];

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

  constructor(private latestService: LatestService, private categoryService: CategoryService, private router:Router) { }
 
  ngOnInit(): void {
    this.subscribeToLatestPosts(); 
  }


  subscribeToLatestPosts() {
    this.latestService.getLatest(this.communityCategoryID, this.sortType, this.postCount)
      .subscribe((data: any) => {
        this.latestPosts = data;
        this.getCategories();
      });
  }

  onSortSelectionChange(sortOption:string){
    this.sortType = sortOption;
    this.subscribeToLatestPosts();
  }

  getCategories() {
    this.categoryService.getCategories(1)
      .subscribe((data: any[]) => {
        this.categories = data;      
        this.parentDropdownOptions = data.map(category => category.communityCategoryName);
      });
  }

  handleOptionSelected(option: string) {  
    if (option === 'All') {      
      this.communityCategoryID = 0;
    } else {
      const selectedCategory = this.categories.find(category => category.communityCategoryName === option);
      if (selectedCategory) {        
        this.communityCategoryID = selectedCategory.communityCategoryID;
      } else {
        console.error('Category not found:', option);
        return;
      }
    }   
    this.subscribeToLatestPosts();      
  }

  goToThread(threadID: number) {
    this.router.navigate([`/community/post-replies`]
    , {
      queryParams: {
        threadID: threadID,       
      },
    });
  }
  
}
