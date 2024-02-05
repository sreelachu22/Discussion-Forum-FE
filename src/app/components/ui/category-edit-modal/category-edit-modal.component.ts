import { Component, Input, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CategoryModalService } from 'src/app/service/DataServices/category-modal.service';
import { CategoryService } from 'src/app/service/HttpServices/category.service';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';
import { DataService } from 'src/app/service/DataServices/data.service';
import { tap } from 'rxjs';
@Component({
  selector: 'app-category-edit-modal',
  templateUrl: './category-edit-modal.component.html',
  styleUrls: ['./category-edit-modal.component.css'],
})
export class CategoryEditModalComponent {
  constructor(
    private categoryModalService: CategoryModalService,
    private categoryService: CategoryService,
    private httpService: CategoryService,
    private router: Router,
    private activateRoute: ActivatedRoute,
    public modalRef: BsModalRef,
    public modalService: BsModalService,
    private dataService: DataService
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
          this.dataService.updateExistingData(data);
          this.dataService.loadCategories;
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
  //methods for open modal for delete
  openDeleteModal(communityCategoryMappingID: number) {
    console.log('id for delete:', communityCategoryMappingID);
    this.communityCategoryMappingID = communityCategoryMappingID;
    const initialState = {
      confirmFunction: this.confirm.bind(this),
      declineFunction: this.decline.bind(this),
    };

    this.bsmodalRef = this.modalService.show(DeleteModalComponent, {
      initialState,
    });
    this.bsmodalRef.content.subscribe(() => {
      this.dataService.loadCategories();
    });
  }
  // openDeleteModal(template: TemplateRef<void>) {
  //   console.log('id for delete:', this.communityCategoryMappingID);
  //   this.bsmodalRef = this.modalService.show(template, { class: 'modal-sm' });
  // }

  //after getting confirmation for delete, delete api calls
  confirm(): void {
    this.httpService
      .deleteCategoryMapping(this.communityCategoryMappingID)
      .pipe(
        tap(() => {
          // Perform any side effect here, e.g., updating the data
          this.dataService.loadCategories();
        })
      )
      .subscribe({
        next: (data: any) => {
          // this.dataService.updateExistingData(data);
          // Update the data immediately after deletion
          // this.dataService.loadCategories();
          // Close the modal
          this.modalRef.hide();
        },
        error: (error: Error) => {
          alert('Error has occured, ' + error.message);
        },
        complete: () => {
          this.modalRef.hide();
          this.dataService.loadCategories();
        },
      });
  }

  decline() {
    this.bsmodalRef?.hide();
    this.dataService.loadCategories();
  }
  closeModal() {
    this.modalRef.hide();
    this.dataService.loadCategories();
  }

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
  // loadCategories() {
  //   this.httpService
  //     .getPagedCategories(this.currentPage, this.sortType)
  //     .subscribe((data) => {
  //       this.categories = data.categories;
  //       this.dataService.updateDataSource(data);
  //       this.pageCount = data.totalPages;
  //       console.log(this.pageCount);
  //     });
  // }
}
