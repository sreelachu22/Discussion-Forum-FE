import { Component, TemplateRef } from '@angular/core';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { CategoryCreateModalComponent } from 'src/app/components/ui/category-create-modal/category-create-modal.component';
import { superAdminCategoryService } from 'src/app/service/HttpServices/superadmin-category.service';

@Component({
  selector: 'app-superadmin-category-management',
  templateUrl: './superadmin-category-management.component.html',
  styleUrls: ['./superadmin-category-management.component.css'],
})
export class SuperadminCategoryManagementComponent {
  sortOptions = ['communityCategoryName', 'description', 'CreatedAt'];
  sortType: string = 'communityCategoryName';
  title: string = 'categoryPage';
  searchText: string = '';
  categoriesList: any[] = [];
  currentPage: number = 1;
  pageCount: number = 1;
  constructor(
    private httpService: superAdminCategoryService,
    private modalService: BsModalService
  ) {}

  ngOnInit(): void {
    this.getCategoriesInCommunity();
    // this.loadCategories();
    // this.getCategoriesInCommunity();
  }

  // getSingleCategory() {
  //   if (this.searchText == '') {
  //     this.loadCategories();
  //   } else {
  //     this.httpService
  //       .getPagedCategories(this.currentPage, this.searchText)
  //       .subscribe((data) => {
  //         this.categoriesList = data.categories;
  //         this.pageCount = data.totalPages;
  //       });
  //   }
  // }

  // loadCategories() {
  //   this.httpService
  //     .getPagedCategories(this.currentPage, this.sortType)
  //     .subscribe((data) => {
  //       this.categoriesList = data.categories;

  //       this.pageCount = data.totalPages;
  //       console.log(this.pageCount);
  //     });
  // }

  // nextPage() {
  //   if (this.currentPage <= this.pageCount - 1) {
  //     this.currentPage++;
  //     this.loadCategories();
  //   }
  // }

  // prevPage() {
  //   if (this.currentPage > 1) {
  //     this.currentPage--;
  //     this.loadCategories();
  //   }
  // }

  // onSortSelectionChange(selectedValue: string) {
  //   this.sortType = selectedValue;
  //   this.loadCategories();
  // }

  //---------------------------------------------

  modalRef?: BsModalRef;

  bsmodalRef?: BsModalRef;

  openDeleteCategoryModal(template: TemplateRef<void>) {
    console.log('modal called');
    this.bsmodalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  openCreateCategoryModal(template: TemplateRef<void>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  communityCategoryID: number = 0;
  oldCategoryName: string = '';
  newCategoryName: string = '';

  openUpdateModal(template: TemplateRef<void>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  closeModal(): void {
    this.modalRef?.hide();
  }

  categories: {
    communityCategoryID: number;
    communityCategoryName: string;
    isDeleted: boolean;
  }[] = [];

  hoveredCategoryId: number | null = null;

  setHoveredCategoryId(categoryId: number | null) {
    this.hoveredCategoryId = categoryId;
  }

  isCategoryOrIconsHovered(categoryId: number): boolean {
    return this.hoveredCategoryId === categoryId;
  }

  faEdit = faEdit;
  faDelete = faTrash;

  id: number = 1;

  getCategoriesInCommunity() {
    this.httpService.getCategories().subscribe({
      next: (data: any) => {
        this.categories = data;
        // console.log(data);
      },
      error: (error: Error) => {
        alert('Error has occured, ' + error.message);
      },
      complete: () => {
        console.log('Completed');
      },
    });
  }

  createCategory() {
    this.httpService.createCategory(this.newCategoryName).subscribe({
      next: (data: any) => {
        // alert('Category created');
        this.modalRef?.hide();
      },
      error: (error: Error) => {
        alert('Error has occured, ' + error.message);
      },
      complete: () => {
        console.log('Completed');
      },
    });
  }

  updateCategory(id: number) {
    this.httpService.updateCategory(id, this.newCategoryName, false).subscribe({
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

  confirm(categoryID: number): void {
    this.httpService.deleteCategory(categoryID).subscribe({
      next: (data: any) => {
        // alert('deleted ');
        this.bsmodalRef?.hide();
        // console.log('deleted ' + data);
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
    this.bsmodalRef?.hide();
  }
}
