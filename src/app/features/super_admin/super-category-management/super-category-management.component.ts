import { Component, OnInit, TemplateRef } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { CategoryCreateModalComponent } from 'src/app/components/ui/category-create-modal/category-create-modal.component';
import { CategoryService } from 'src/app/service/HttpServices/category.service';

@Component({
  selector: 'app-super-category-management',
  templateUrl: './super-category-management.component.html',
  styleUrls: ['./super-category-management.component.css']
})
export class SuperCategoryManagementComponent implements OnInit {
  sortOptions = ['communityCategoryName', 'description', 'CreatedAt'];
  sortType: string = 'communityCategoryName';
  title: string = 'categoryPage';
  searchText: string = '';
  categoriesList: any[] = [];
  currentPage: number = 1;
  pageCount: number = 1;
  constructor(
    private httpService: CategoryService,
    private modalService: BsModalService
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

  //---------------------------------------------

  community_name: string = 'Experion Discussion';

  modalRef?: BsModalRef;

  openDeleteModal(template: TemplateRef<void>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  openCreateCategoryModal() {
    this.modalRef = this.modalService.show(CategoryCreateModalComponent);
  }

  communityCategoryMappingID: number = 0;
  oldDescription: string = '';
  newDescription: string = '';
  modifiedBy: string = '';

  openUpdateModal(template: TemplateRef<void>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  updateCategoryDescription(id: number) {
    this.httpService
      .updateCategoryDescription(id, this.newDescription, this.modifiedBy)
      .subscribe({
        next: (data: any) => {
          alert('Category updated successfully');
          this.modalRef?.hide; // Close the modal after updating
        },
        error: (error: any) => {
          console.error('Error updating category:', error);
          // Handle error as needed
        },
      });
  }

  categoryID = 4;
  confirm(categoryID: number): void {
    this.httpService.deleteCategoryMapping(categoryID).subscribe({
      next: (data: any) => {
        alert('deleted');
        console.log(data);
      },
      error: (error: Error) => {
        alert('Error has occured, ' + error.message);
      },
      complete: () => {
        console.log('Completed');
      },
    });
    this.modalRef?.hide();
  }

  decline(): void {
    this.modalRef?.hide();
  }

  isRowHovered: number | null = null;
  onMouseEnter(index: number) {
    this.isRowHovered = index;
  }
  onMouseLeave() {
    this.isRowHovered = null;
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
}
