import {
  Component,
  NgModule,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import {
  AllCategories,
  Categories,
  CategoryService,
  CommunityCategory,
} from 'src/app/service/HttpServices/category.service';
import {
  IconDefinition,
  faEdit,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { CategoryCreateModalComponent } from 'src/app/components/ui/category-create-modal/category-create-modal.component';
import { MatTableDataSource } from '@angular/material/table';
import { Category } from 'src/app/service/HttpServices/superadmin-category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryEditModalComponent } from 'src/app/components/ui/category-edit-modal/category-edit-modal.component';
import { CategoryModalService } from 'src/app/service/DataServices/category-modal.service';
import { formatDate } from '@angular/common';
export interface TableColumn {
  name: string; // column name
  dataKey: string; // name of key of the actual data in this column
  position?: 'right' | 'left'; // should it be right-aligned or left-aligned?
  isSortable?: boolean; // can a column be sorted?
}
@Component({
  selector: 'app-category-management',
  templateUrl: './category-management.component.html',
  styleUrls: ['./category-management.component.css'],
})
export class CategoryManagementComponent implements OnInit {
  sortOptions = ['communityCategoryName', 'description', 'createdAt'];
  sortType: string = 'communityCategoryName';
  title: string = 'categoryPage';
  searchText: string = '';
  categoriesList!: AllCategories;
  currentPage: number = 1;
  pageCount: number = 1;
  displayedColumns: string[] = [
    'communityCategoryName',
    'description',
    'createdAt',
  ];

  displayedNames: string[] = ['Category', 'Description', 'Created Date'];
  constructor(
    private httpService: CategoryService,
    private modalService: BsModalService,
    private router: Router,
    private categoryModalService: CategoryModalService,
    private activateRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.sortType = 'communityCategoryName';
    this.loadCategories();
    // this.getCategoriesInCommunity();
  }

  breadcrumbs = [
    { label: 'Home', route: '/home' },
    { label: 'Community', route: '/community' },
    { label: 'Community Management', route: '/community-management-dashboard' },
    {
      label: 'Category Management',
      route: '/community-management-dashboard/category-management',
    },
  ];

  getSingleCategory() {
    if (this.searchText == '') {
      this.loadCategories();
    } else {
      this.httpService
        .getPagedCategories(this.currentPage, this.searchText)
        .subscribe((data) => {
          this.categories = data.categories;
          this.pageCount = data.totalPages;
        });
    }
  }

  faEdit = faEdit;
  faDelete = faTrash;
  categories: Categories[] = [];
  //categories pagination api
  loadCategories() {
    this.httpService
      .getPagedCategories(this.currentPage, this.sortType)
      .subscribe((data) => {
        this.categories = data.categories.map((category: { createdAt: string | number | Date; }) => {
          return {
            ...category,
            createdAt: formatDate(category.createdAt, 'dd-MM-yyyy', 'en-US')
          };
        });
        this.pageCount = data.totalPages;
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

  //on changing sort option the categories must load based on the filtering
  onSortSelectionChange(selectedValue: string) {
    this.sortType = selectedValue;
    this.loadCategories();
  }

  // BsModalRef stands for Bootstrap Modal Reference.
  modalRef?: BsModalRef;

  openCreateCategoryModal() {
    this.modalRef = this.modalService.show(CategoryCreateModalComponent);
    this.modalRef.content.categoryCreated.subscribe(() => {
      this.loadCategories();
    });
  }

  updateRef?: BsModalRef;
  onCategoryIconClick(event: { icon: string; data: any }): void {
    if (event.icon === 'edit') {
      const communityCategoryMappingID = event.data.communityCategoryMappingID;
      const description = event.data.description;

      this.categoryModalService.setCategoryData(
        communityCategoryMappingID,
        description
      );
      this.updateRef = this.modalService.show(CategoryEditModalComponent);
      this.updateRef.content.categoryUpdated.subscribe(() => {
        console.log('called loadCategories');
        this.loadCategories();
      });
    }
  }

  communityCategoryMappingID: number = 0;
  oldDescription: string = '';
  newDescription: string = '';
  modifiedBy: string = '';

  id: number = 1;

  //get all categories inside a community
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
}
