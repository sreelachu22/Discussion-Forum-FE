import { Component, SimpleChanges, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CategoryService } from 'src/app/service/HttpServices/category.service';
import { searchService } from 'src/app/service/HttpServices/search.service';

@Component({
  selector: 'app-community-page',
  templateUrl: './community-page.component.html',
  styleUrls: ['./community-page.component.css'],
})
export class CommunityPageComponent {
  constructor(
    private httpService: CategoryService,
    private searchService: searchService,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private modalService: BsModalService
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
  searchTerm: string = '';
  categoriesList: any[] = [];
  currentPage: number = 1;
  pageCount: number = 1;

  isResultFound: boolean = false;

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

  openSearchModal(template: TemplateRef<void>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  closeModal() {
    this.modalRef?.hide();
    this.isResultFound = false;
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

  threads: {
    threadID: number;
    communityCategoryMappingID: number;
    content: string;
    threadStatusID: number;
    isAnswered: boolean;
    isDeleted: boolean;
    createdBy: string;
    createdAt: string;
    modifiedBy: Date;
    modifiedAt: Date;
    communityCategoryMapping: any;
    threadStatus: any;
    createdByUser: any;
    modifiedByUser: any;
    threadVotes: any;
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

  searchResult(template: TemplateRef<void>) {
    this.searchService.searchResult(this.searchTerm).subscribe({
      next: (data: any) => {
        this.threads = data;
        this.isResultFound = true;
        if (this.isResultFound && data.length > 0) {
          this.openSearchModal(template);
        } else if (this.isResultFound && data.length <= 0) {
          alert('No search result found');
        }
        console.log(this.threads);
        console.log(this.isResultFound);
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
