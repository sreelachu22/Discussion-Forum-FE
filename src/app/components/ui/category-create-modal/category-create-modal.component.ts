import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CategoryService } from 'src/app/service/HttpServices/category.service';
import {
  Category,
  superAdminCategoryService,
} from 'src/app/service/HttpServices/superadmin-category.service';
import { InvalidPopupComponent } from '../invalid-popup/invalid-popup.component';

@Component({
  selector: 'app-category-create-modal',
  templateUrl: './category-create-modal.component.html',
  styleUrls: ['./category-create-modal.component.css'],
})
export class CategoryCreateModalComponent implements OnInit {
  id: number = 1;
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
    private router: Router
  ) {}

  alertRef?: BsModalRef;

  ngOnInit() {
    this.getCategoriesNotinCommunity();
  }

  getCategoriesNotinCommunity() {
    this.httpService.getCategoriesNotInCommunity(this.id).subscribe({
      next: (data: any) => {
        this.categoriesNotInCommunity = data;
      },
      error: (error: Error) => {
        alert('Error has occured, ' + error.message);
      },
      complete: () => {
        console.log('Completed');
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
        console.log('Completed');
      },
    });
  }

  @Output() categoryCreated: EventEmitter<Category> =
    new EventEmitter<Category>();

  createCategory() {
    console.log('hi');
    // alert('selected community category' + this.selectedCommunityCategory);
    if (this.selectedCommunityCategory != 'other') {
      this.newCategoryName = this.selectedCommunityCategory;
      // alert('inside - name : ' + this.newCategoryName);
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
    // alert('new category name outside:' + this.newCategoryName);
    const id = 1;
    const body = {
      communitCategoryName: this.newCategoryName,
      description: this.description,
      createdBy: this.createdBy,
    };

    this.httpService
      .createCategoryDescription(
        id,
        body.description,
        body.communitCategoryName,
        body.createdBy
      )
      .subscribe({
        next: (data: any) => {
          // alert('New category added');
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
