import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/service/HttpServices/category.service';

@Component({
  selector: 'app-community-page',
  templateUrl: './community-page.component.html',
  styleUrls: ['./community-page.component.css'],
})
export class CommunityPageComponent {
  constructor(
    private httpService: CategoryService,
    private router: Router,
    private activateRoute: ActivatedRoute
  ) {}

  communityID: number = 0;
  ngOnInit(): void {
    // this.getCategoriesInCommunity();
    this.loadCategories();
    this.activateRoute.queryParams.subscribe((params) => {
      this.communityID = params['communityID'];
      // Now you have access to communityCategoryMappingID
      // Use it as needed in your component logic.
    });
  }
  sortOptions = ['communityCategoryName', 'description', 'CreatedAt'];
  sortType: string = 'communityCategoryName';
  title: string = 'categoryPage';
  searchText: string = '';
  categoriesList: any[] = [];
  currentPage: number = 1;
  pageCount: number = 1;

  getSingleCategory() {
    if (this.searchText == '') {
      this.loadCategories();
    } else {
      this.httpService
        .getPagedCategories(this.currentPage, this.searchText)
        .subscribe((data) => {
          this.categoriesList = data.categories;
          this.pageCount = data.totalPages;
        });
    }
  }

  loadCategories() {
    this.httpService
      .getPagedCategories(this.currentPage, this.sortType)
      .subscribe((data) => {
        this.categoriesList = data.categories;

        this.pageCount = data.totalPages;
        console.log(this.pageCount);
      });
  }

  nextPage() {
    if (this.currentPage <= this.pageCount - 1) {
      this.currentPage++;
      this.loadCategories();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadCategories();
    }
  }

  onSortSelectionChange(selectedValue: string) {
    this.sortType = selectedValue;
    this.loadCategories();
  }

  categories: {
    communityCategoryMappingID: number;
    communityID: number;
    communityCategoryID: number;
    communityCategoryName: string;
    description: string;
    isDeleted: boolean;
    createdAt: Date;
    modifiedAt: Date;
    threadCount: number;
  }[] = [];

  id: number = 1;
  getCategoriesInCommunity() {
    this.httpService.getCategories(this.id).subscribe({
      next: (data: any) => {
        this.categories = data;
        console.log(data);
      },
      error: (error: Error) => {
        alert('Error has occured, ' + error.message);
      },
      complete: () => {
        console.log('Completed');
      },
    });
  }

  navigateToPosts(communityCategoryMappingID: number) {
    this.router.navigate(['category_threads'], {
      queryParams: {
        communityCategoryMappingID: communityCategoryMappingID,
      },
    });
  }
  navigateToCommunityManagement(communityID: number) {
    this.router.navigate(['community_management_dashboard'], {
      queryParams: {
        communityID: communityID,
      },
    });
  }
}
