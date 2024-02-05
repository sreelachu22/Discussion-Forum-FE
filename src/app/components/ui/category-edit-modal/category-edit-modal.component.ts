import { Component, Input, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CategoryModalService } from 'src/app/service/DataServices/category-modal.service';
import { CategoryService } from 'src/app/service/HttpServices/category.service';
@Component({
  selector: 'app-category-edit-modal',
  templateUrl: './category-edit-modal.component.html',
  styleUrls: ['./category-edit-modal.component.css'],
})
export class CategoryEditModalComponent {
  constructor(
    private categoryModalService: CategoryModalService,
    private httpService: CategoryService,
    private router: Router,
    private activateRoute: ActivatedRoute,
    public modalRef: BsModalRef,
    public modalService: BsModalService
  ) {}
  description: string = '';
  communityCategoryMappingID: number = 0;
  newDescription: string = '';
  modifiedBy: string = '';

  ngOnInit() {
    this.categoryModalService.communityCategoryMappingID$.subscribe((id) => {
      this.communityCategoryMappingID = id;
    });

    this.categoryModalService.description$.subscribe((desc) => {
      this.description = desc;
    });
  }

  //update category mapping description
  updateCategoryDescription() {
    this.httpService
      .updateCategoryDescription(
        this.communityCategoryMappingID,
        this.newDescription,
        this.modifiedBy
      )
      .subscribe({
        next: (data: any) => {
          this.modalRef?.hide();
        },
        error: (error: any) => {
          console.error('Error updating category:', error);
        },
        complete: () => {
          console.log('Completed');
        },
      });
  }
  // BsModalRef stands for Bootstrap Modal Reference.
  bsmodalRef?: BsModalRef;
  //methods for open modal for update,delete,create
  openDeleteModal(template: TemplateRef<void>) {
    console.log('id for delete:', this.communityCategoryMappingID);
    this.bsmodalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  //after getting confirmation for delete, delete api calls
  confirm(categoryID: number): void {
    this.httpService.deleteCategoryMapping(categoryID).subscribe({
      next: (data: any) => {
        this.bsmodalRef?.hide();
      },
      error: (error: Error) => {
        alert('Error has occured, ' + error.message);
      },
      complete: () => {
        this.modalRef.hide();
      },
    });
  }

  decline() {
    this.bsmodalRef?.hide();
  }
  closeModal() {
    this.modalRef.hide();
  }
}
