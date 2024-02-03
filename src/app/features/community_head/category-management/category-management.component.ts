import {
  Component,
  NgModule,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import {
  AllCategories,
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
import { Router } from '@angular/router';
import { CategoryEditModalComponent } from 'src/app/components/ui/category-edit-modal/category-edit-modal.component';
import { CategoryModalService } from 'src/app/service/DataServices/category-modal.service';
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
  sortOptions = ['communityCategoryName', 'description', 'CreatedAt'];
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
    private categoryModalService: CategoryModalService
  ) {}

  ngOnInit(): void {
    this.loadCategories();
    // this.getCategoriesInCommunity();
  }

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
  categories: {
    communityCategoryMappingID: number;
    communityID: number;
    communityCategoryID: number;
    communityCategoryName: string | null;
    description: string;
    isDeleted: boolean;
    createdBy: string | null;
    createdAt: string;
    modifiedBy: string | null;
    modifiedAt: string | null;
    threadCount: number | null;
  }[] = [];
  //categories pagination api
  loadCategories() {
    this.httpService
      .getPagedCategories(this.currentPage, this.sortType)
      .subscribe((data) => {
        this.categories = data.categories;
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

  //on changing sort option the categories must load based on the filtering
  onSortSelectionChange(selectedValue: string) {
    this.sortType = selectedValue;
    this.loadCategories();
  }

  // BsModalRef stands for Bootstrap Modal Reference.
  modalRef?: BsModalRef;

  //methods for open modal for update,delete,create
  // openDeleteModal(template: TemplateRef<void>) {
  //   this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  // }

  openCreateCategoryModal() {
    this.modalRef = this.modalService.show(CategoryCreateModalComponent);
  }

  // openUpdateModal(template: TemplateRef<void>) {
  //   this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  // }

  onCategoryIconClick(event: { icon: string; data: any }): void {
    if (event.icon === 'edit') {
      const communityCategoryMappingID = event.data.communityCategoryMappingID;
      const description = event.data.description;

      this.categoryModalService.setCategoryData(
        communityCategoryMappingID,
        description
      );
      this.modalRef = this.modalService.show(CategoryEditModalComponent);
    }
  }

  // onCategoryIconClick(event: { icon: string; data: any }): void {
  //   if (event.icon === 'edit') {
  //     const dialogRef = this.dialog.open(CategoryEditModalComponent, {
  //       width: '600px', // Adjust the width as per your requirement
  //       data: {
  //         communityCategoryMappingID: event.data.communityCategoryMappingID,
  //         description: event.data.description,
  //       },
  //     });

  //     dialogRef.afterClosed().subscribe((result: any) => {
  //       // Handle any data or action returned from the modal
  //       console.log('Modal closed with result:', result);
  //     });
  //   }
  // }

  communityCategoryMappingID: number = 0;
  oldDescription: string = '';
  newDescription: string = '';
  modifiedBy: string = '';

  //update category mapping description
  // updateCategoryDescription(id: number) {
  //   this.httpService
  //     .updateCategoryDescription(id, this.newDescription, this.modifiedBy)
  //     .subscribe({
  //       next: (data: any) => {
  //         alert('Category updated successfully');
  //         this.modalRef?.hide; // Close the modal after updating
  //       },
  //       error: (error: any) => {
  //         console.error('Error updating category:', error);
  //       },
  //     });
  // }

  //after getting confirmation for delete, delete api calls
  // confirm(categoryID: number): void {
  //   this.httpService.deleteCategoryMapping(categoryID).subscribe({
  //     next: (data: any) => {
  //       alert('deleted');
  //     },
  //     error: (error: Error) => {
  //       alert('Error has occured, ' + error.message);
  //     },
  //     complete: () => {
  //       console.log('Completed');
  //     },
  //   });
  //   //hide modal after deleting
  //   this.modalRef?.hide();
  // }

  //close the modal
  decline(): void {
    this.modalRef?.hide();
  }

  //To find in which table row is hovered
  isRowHovered: number | null = null;
  onMouseEnter(index: number) {
    this.isRowHovered = index;
  }
  onMouseLeave() {
    this.isRowHovered = null;
  }

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
