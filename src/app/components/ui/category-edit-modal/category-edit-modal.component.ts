import {
  Component,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CategoryModalService } from 'src/app/service/DataServices/category-modal.service';
import { CategoryService } from 'src/app/service/HttpServices/category.service';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';
import { tap } from 'rxjs';
import { Category } from 'src/app/service/HttpServices/superadmin-category.service';
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
    public modalService: BsModalService
    public updateRef: BsModalRef,
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

  @Output() categoryUpdated: EventEmitter<Category> =
    new EventEmitter<Category>();

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
          this.categoryUpdated.emit(data);
          console.log(this.categoryUpdated);
          this.router.navigate(
            ['/community-management-dashboard/category-management'],
            { queryParams: { sortType: 'communityCategoryName' } }
          );
          this.updateRef?.hide();
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
    });
  }

  //after getting confirmation for delete, delete api calls
  confirm(): void {
    this.httpService
      .deleteCategoryMapping(this.communityCategoryMappingID)
      .subscribe({
        next: (data: any) => {
          this.categoryUpdated.emit(data);
          // Close the modal
          this.updateRef.hide();
        },
        error: (error: Error) => {
          alert('Error has occured, ' + error.message);
        },
        complete: () => {
          this.modalRef.hide();
          this.updateRef.hide();
        },
      });
  }

  decline() {
    this.bsmodalRef?.hide();
    this.updateRef?.hide();
  }
  closeModal() {
    this.modalRef.hide();
    this.updateRef.hide();
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
}
