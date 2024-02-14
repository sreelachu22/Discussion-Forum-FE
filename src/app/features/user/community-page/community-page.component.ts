import { Component, Input, SimpleChanges, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AccountsService } from 'src/app/service/HttpServices/account.service';
import {
  CommunityCategory,
  CategoryService,
} from 'src/app/service/HttpServices/category.service';
import {
  CommunityDetails,
  CommunityService,
} from 'src/app/service/HttpServices/community.service';
import { LoaderService } from 'src/app/service/HttpServices/loader.service';
import { searchService } from 'src/app/service/HttpServices/search.service';
import { Thread } from 'src/app/service/HttpServices/thread.service';

@Component({
  selector: 'app-community-page',
  templateUrl: './community-page.component.html',
  styleUrls: ['./community-page.component.css'],
})
export class CommunityPageComponent {
  constructor(
    private httpService: CategoryService,
    private communityHttpService: CommunityService,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private modalService: BsModalService,
    private accountService: AccountsService,
    private loaderService: LoaderService
  ) {}

  breadcrumbs = [
    { label: 'Home', route: '/home' },
    { label: 'Community', route: '/community' },
  ];

  communityID: number = 1;
  community!: CommunityDetails;

  communityName!: string;

  isLoading = false;
  isAdmin: boolean = false;
  ngOnInit(): void {
    this.activateRoute.queryParams.subscribe((params) => {
      this.communityID = params['communityID'];
      this.communityName = params['communityName'] || 'PM-Hub';
    });
    this.loadCategories();
    // this.loadCommunity();
    this.loaderService.isLoading$.subscribe((isLoading) => {
      this.isLoading = isLoading;
    });
    this.isAdmin = this.accountService.isAdmin;
  }

  loadCommunity() {
    this.communityHttpService
      .getACommunity(this.communityID)
      .subscribe((data) => {
        this.community = data;
      });
  }

  sortOptions = ['communityCategoryName', 'description', 'CreatedAt'];
  sortType: string = '-threadCount';
  title: string = 'categoryPage';
  searchText: string = '';
  searchTerm: string = '';
  categoriesList: any[] = [];
  currentPage: number = 1;
  pageCount: number = 1;
  pages: number[] = [];
  pageSize: number = 6;
  totalPages: number = 0;

  getSingleCategory() {
    if (this.searchText == '') {
      this.loadCategories();
    } else {
      this.httpService
        .getPagedCategories(this.currentPage, this.searchText)
        .subscribe((data) => {
          this.categoriesList = data.categories;
          this.totalPages = Math.ceil(data.totalCount / this.pageSize);
          this.updatePageNumbers();
        });
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

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadCategories();
    }
  }

  loadCategories() {
    this.httpService
      .getPagedCategories(this.currentPage, this.sortType)
      .subscribe((data) => {
        this.categoriesList = data.categories;

        this.pageCount = data.totalPages;
        // console.log(this.pageCount);
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

  modalRef?: BsModalRef;

  categories: CommunityCategory[] = [];

  threads: Thread[] = [];

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

  searchResult(searchTerm: string) {
    this.router.navigate(['/search-results'], {
      queryParams: { searchTerm: this.searchTerm },
    });
  }

  navigateToPosts() {
    this.router.navigate([`/community/category-posts`])
    //communityCategoryMappingID: number
    //  {
    //   queryParams: { communityCategoryMappingID: communityCategoryMappingID },
    // });
  }
  navigateToCommunityManagement(communityID: number) {
    this.router.navigate(['community-management-dashboard'], {
      queryParams: {
        communityID: communityID,
      },
    });
  }
}
