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
import { CommunityDataService } from 'src/app/service/DataServices/community-data.service';
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
    private modalRef: BsModalRef,
    private updateRef: BsModalRef,
    private modalService: BsModalService,
    private communityDataService: CommunityDataService
  ) {}
  @Input()
  description: string = '';
  @Input()
  communityCategoryMappingID: number = 0;
  newDescription: string = '';
  modifiedBy: string | null = '';
  communityID: number = 0;
  ngOnInit() {
    this.categoryModalService.communityCategoryMappingID$.subscribe((id) => {
      this.communityCategoryMappingID = id;
    });

    this.categoryModalService.description$.subscribe((desc) => {
      this.description = desc;
    });

    this.communityDataService.communityID$.subscribe((id) => {
      this.communityID = id;
    });

    this.modifiedBy = sessionStorage.getItem('userID');
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
          this.updateRef?.hide();
        },
        error: (error: any) => {
          console.error('Error updating category:', error);
        },
      });
  }

  // BsModalRef stands for Bootstrap Modal Reference.
  bsmodalRef?: BsModalRef;
  //methods for open modal for delete
  openDeleteModal() {
    const initialState = {
      communityCategoryMappingID: this.communityCategoryMappingID,
      confirmFunction: this.confirm.bind(this),
      declineFunction: this.decline.bind(this),
    };

    this.bsmodalRef = this.modalService.show(DeleteModalComponent, {
      initialState,
    });
  }

  //after getting confirmation for delete, delete api calls
  confirm(): void {
    this.httpService
      .deleteCategoryMapping(this.communityCategoryMappingID)
      .subscribe({
        next: (data: any) => {
          this.httpService
            .getPagedCategories(this.communityID, 1, '-createdAt')
            .subscribe({
              next: (data: any) => {},
              error: (error: Error) => {
                alert('Error has occured, ' + error.message);
              },
            });
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
