import { Component, SimpleChanges, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import {
  CommunityCategory,
  CategoryService,
} from 'src/app/service/HttpServices/category.service';
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
    private router: Router,
    private activateRoute: ActivatedRoute,
    private modalService: BsModalService,
    private loaderService: LoaderService
  ) {}

  breadcrumbs = [
    { label: 'Home', route: '/home' },
    { label: 'Community', route: '/community' },
  ];

  communityID: number = 0;
  isLoading = false;
  ngOnInit(): void {
    this.loadCategories();
    this.activateRoute.queryParams.subscribe((params) => {
      this.communityID = params['communityID'];
    });
    this.loaderService.isLoading$.subscribe((isLoading) => {
      this.isLoading = isLoading;
    });
  }
  sortOptions = ['communityCategoryName', 'description', 'createdAt'];
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

  navigateToPosts(communityCategoryMappingID: number) {
    this.router.navigate([`/community/category-posts`], {
      queryParams: { communityCategoryMappingID: communityCategoryMappingID },
    });
  }
  navigateToCommunityManagement(communityID: number) {
    this.router.navigate(['community-management-dashboard'], {
      queryParams: {
        communityID: communityID,
      },
    });
  }
}
