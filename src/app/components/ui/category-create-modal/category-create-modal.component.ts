import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CategoryService } from 'src/app/service/HttpServices/category.service';
import {
  Category,
  superAdminCategoryService,
} from 'src/app/service/HttpServices/superadmin-category.service';
import { InvalidPopupComponent } from '../invalid-popup/invalid-popup.component';
import { CommunityDataService } from 'src/app/service/DataServices/community-data.service';

@Component({
  selector: 'app-category-create-modal',
  templateUrl: './category-create-modal.component.html',
  styleUrls: ['./category-create-modal.component.css'],
})
export class CategoryCreateModalComponent implements OnInit {
  categoriesNotInCommunity: Category[] = [];
  allCategories: any[] = [];
  selectedCommunityCategory: string = '';
  description: string = '';
  createdBy: string = '';
  communityCategory: string = '';
  newCategoryName: string = '';

  constructor(
    public bsModalRef: BsModalRef,
    private modalService: BsModalService,
    private httpService: CategoryService,
    private categoryService: superAdminCategoryService,
    private router: Router,
    private communityDataService: CommunityDataService
  ) {}

  alertRef?: BsModalRef;

  communityID: number = 0;
  ngOnInit() {
    this.communityDataService.communityID$.subscribe((id) => {
      this.communityID = id;
    });
    this.getCategoriesNotinCommunity();
  }

  getCategoriesNotinCommunity() {
    this.httpService.getCategoriesNotInCommunity(this.communityID).subscribe({
      next: (data: any) => {
        this.categoriesNotInCommunity = data;
      },
      error: (error: Error) => {
        alert('Error has occured, ' + error.message);
      },
      complete: () => {
        this.getCategories();
      },
    });
  }

  getCategories() {
    this.categoryService.getCategories().subscribe({
      next: (data: any) => {
        this.allCategories = data;
      },
      error: (error: Error) => {
        alert('Error has occured, ' + error.message);
      },
      complete: () => {
      },
    });
  }

  @Output() categoryCreated: EventEmitter<Category> =
    new EventEmitter<Category>();

  createCategory() {
    if (this.selectedCommunityCategory != 'other') {
      this.newCategoryName = this.selectedCommunityCategory;
    }
    if (this.selectedCommunityCategory === 'other') {
      // Check if the new category name already exists

      const categoryExists = this.allCategories.some(
        (category) => category.communityCategoryName === this.newCategoryName
      );

      if (categoryExists) {
        // Category name already exists, show error message or take appropriate action
        this.alertRef = this.modalService.show(InvalidPopupComponent, {
          initialState: {
            message: 'Category name already exists', //make use of reusable success pop up , sends message to it
          },
        });
        return; // Exit function early
      }
    }
    const body = {
      communitCategoryName: this.newCategoryName,
      description: this.description,
      createdBy: sessionStorage.getItem('userID'),
    };

    this.httpService
      .createCategoryDescription(
        this.communityID,
        body.description,
        body.communitCategoryName,
        body.createdBy
      )
      .subscribe({
        next: (data: any) => {
          this.categoryCreated.emit(data); // Emit event with created category data
          this.bsModalRef.hide();
        },
        error: (error: any) => {
          console.error('Error creating category:', error);
        },
      });
  }

  closeModal() {
    this.bsModalRef.hide();
  }
}
