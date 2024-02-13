import { Component, TemplateRef } from '@angular/core';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { MatTooltip } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { CategoryCreateModalComponent } from 'src/app/components/ui/category-create-modal/category-create-modal.component';
import { DeleteModalComponent } from 'src/app/components/ui/delete-modal/delete-modal.component';
import { InvalidPopupComponent } from 'src/app/components/ui/invalid-popup/invalid-popup.component';
import { SuccessPopupComponent } from 'src/app/components/ui/success-popup/success-popup.component';
import {
  Category,
  superAdminCategoryService,
} from 'src/app/service/HttpServices/superadmin-category.service';

@Component({
  selector: 'app-superadmin-category-management',
  templateUrl: './superadmin-category-management.component.html',
  styleUrls: ['./superadmin-category-management.component.css'],
})
export class SuperadminCategoryManagementComponent {
  sortOptions = ['communityCategoryName', 'description', 'CreatedAt'];
  sortType: string = 'communityCategoryName';
  title: string = '';

  searchText: string = '';
  categoriesList: any[] = [];
  currentPage: number = 1;
  pageCount: number = 1;

  breadcrumbs = [
    { label: 'Home', route: '/home' },
    { label: 'Admin Dashboard', route: '/admin-dashboard' },
    {
      label: 'Category Management',
      route: '/admin-dashboard/admin-category-management',
    },
  ];
  constructor(
    private httpService: superAdminCategoryService,
    private modalService: BsModalService
  ) {}

  ngOnInit(): void {
    this.getCategoriesInCommunity();
  }

  modalRef?: BsModalRef;
  //delete confirmation modal is inside another modal.
  //this modal reference is for delete confirmation modal
  bsmodalRef?: BsModalRef;

  alertRef?: BsModalRef;

  //open modal
  // openDeleteCategoryModal(template: TemplateRef<void>) {
  //   console.log('modal called');
  //   this.bsmodalRef = this.modalService.show(template, { class: 'modal-sm' });
  // }

  openDeleteModal(communityCategoryID: number) {
    console.log('id for delete:', communityCategoryID);
    this.communityCategoryID = communityCategoryID;
    const initialState = {
      confirmFunction: this.confirm.bind(this),
      declineFunction: this.decline.bind(this),
    };

    this.bsmodalRef = this.modalService.show(DeleteModalComponent, {
      initialState,
    });
  }
  //methods for open modal for delete

  openCreateCategoryModal(template: TemplateRef<void>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  openUpdateModal(template: TemplateRef<void>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  closeModal(): void {
    console.log('Closing modal...');
    this.modalRef?.hide();
  }

  //close delete confirmation modal
  decline(): void {
    this.bsmodalRef?.hide();
  }

  communityCategoryID: number = 0;
  oldCategoryName: string = '';
  newCategoryName: string = '';

  categories: Category[] = [];

  //method for finding the hovered category
  hoveredCategoryId: number | null = null;

  setHoveredCategoryId(categoryId: number | null) {
    this.hoveredCategoryId = categoryId;
  }

  isCategoryOrIconsHovered(categoryId: number): boolean {
    return this.hoveredCategoryId === categoryId;
  }

  //icons name to pass to icon component
  faEdit = faEdit;
  faDelete = faTrash;

  id: number = 1;

  getCategoriesInCommunity() {
    this.httpService.getCategories().subscribe({
      next: (data: any) => {
        this.categories = data;
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
    // Check if the category already exists locally
    const categoryExists = this.categories.some(category =>
      category.communityCategoryName === this.newCategoryName
    );
  
    if (categoryExists) {
      // Category name already exists, show error message or take appropriate action
      this.alertRef = this.modalService.show(InvalidPopupComponent, {
        initialState: {
          message: 'Category name already exists', //make use of reusable success pop up , sends message to it
        },
      });
      this.newCategoryName = '';
      return; // Exit function early
    }
  
    // If the category doesn't exist locally, proceed to create it
    this.httpService.createCategory(this.newCategoryName).subscribe({
      next: (data: any) => {
        // Update the list of categories in the community
        this.getCategoriesInCommunity();
        // Hide the modal after successfully creating the category
        this.modalRef?.hide();
        this.newCategoryName = '';
        
      },
      error: (error: Error) => {
        alert('Error has occurred: ' + error.message);
      },
      complete: () => {
        console.log('Completed');
        this.modalRef?.hide();
      },
    });
  }
  

  updateCategory(id: number) {
    this.httpService.updateCategory(id, this.newCategoryName, false).subscribe({
      next: (data: any) => {
        // alert('Category updated successfully');
        this.alertRef = this.modalService.show(SuccessPopupComponent, {
          initialState: {
            message: 'Category updated successfully', //make use of reusable success pop up , sends message to it
          },
        });
        this.getCategoriesInCommunity();
        this.modalRef?.hide(); // Close the modal after updating
        this.newCategoryName = ''; // Clear fields for the next update
      },
      error: (error: any) => {
        console.error('Error updating category:', error);
      },
    });
  }

  confirm(categoryID: number): void {
    this.httpService.deleteCategory(this.communityCategoryID).subscribe({
      next: (data: any) => {
        this.getCategoriesInCommunity();
        this.bsmodalRef?.hide();
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
}
