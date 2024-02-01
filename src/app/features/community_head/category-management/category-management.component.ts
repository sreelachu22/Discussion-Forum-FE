import { Component, OnInit, TemplateRef } from '@angular/core';
import { CategoryService } from 'src/app/service/HttpServices/category.service';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { CategoryCreateModalComponent } from 'src/app/components/ui/category-create-modal/category-create-modal.component';
@Component({
  selector: 'app-category-management',
  templateUrl: './category-management.component.html',
  styleUrls: ['./category-management.component.css'],
})
export class CategoryManagementComponent implements OnInit {
  sortOptions = ['communityCategoryName', 'description', 'CreatedAt'];
  sortType: string = 'communityCategoryName';
  title: string = 'categoryPage';
  // searchText: string = '';
  categoriesList: any[] = [];
  currentPage: number = 1;
  pageCount: number = 1;
  constructor(
    private httpService: CategoryService,
    private modalService: BsModalService
  ) {}

  ngOnInit(): void {
    this.loadCategories();
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

  //vategories pagination api
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

  //on changing sort option the categories must load based on the filtering
  onSortSelectionChange(selectedValue: string) {
    this.sortType = selectedValue;
    this.loadCategories();
  }

  // BsModalRef stands for Bootstrap Modal Reference.
  modalRef?: BsModalRef;

  //methods for open modal for update,delete,create
  openDeleteModal(template: TemplateRef<void>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  openCreateCategoryModal() {
    this.modalRef = this.modalService.show(CategoryCreateModalComponent);
  }

  openUpdateModal(template: TemplateRef<void>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  communityCategoryMappingID: number = 0;
  oldDescription: string = '';
  newDescription: string = '';
  modifiedBy: string = '';

  //update category mapping description
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
        },
      });
  }

  //after getting confirmation for delete, delete api calls
  confirm(categoryID: number): void {
    this.httpService.deleteCategoryMapping(categoryID).subscribe({
      next: (data: any) => {
        alert('deleted');
      },
      error: (error: Error) => {
        alert('Error has occured, ' + error.message);
      },
      complete: () => {
        console.log('Completed');
      },
    });
    //hide modal after deleting
    this.modalRef?.hide();
  }

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

  //icons name for passing to icon component
  faEdit = faEdit;
  faDelete = faTrash;

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
