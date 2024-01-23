import { Component, OnInit, TemplateRef } from '@angular/core';
import { HttpService } from 'src/app/service/http.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { query } from '@angular/animations';
import { CategoryCreateModalComponent } from 'src/app/components/ui/category-create-modal/category-create-modal.component';
@Component({
  selector: 'app-category-management',
  templateUrl: './category-management.component.html',
  styleUrls: ['./category-management.component.css'],
})
export class CategoryManagementComponent implements OnInit {
  constructor(
    private httpService: HttpService,
    private modalService: BsModalService
  ) {}

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

  ngOnInit(): void {
    this.getCategoriesInCommunity();
  }

  faEdit = faEdit;
  faDelete = faTrash;

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
