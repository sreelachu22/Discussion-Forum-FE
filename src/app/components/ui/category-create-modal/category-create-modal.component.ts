import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { CategoryService } from 'src/app/service/HttpServices/category.service';
import { Category } from 'src/app/service/HttpServices/superadmin-category.service';

@Component({
  selector: 'app-category-create-modal',
  templateUrl: './category-create-modal.component.html',
  styleUrls: ['./category-create-modal.component.css'],
})
export class CategoryCreateModalComponent implements OnInit {
  id: number = 1;
  categoriesNotInCommunity: Category[] = [];
  selectedCommunityCategory: string = '';
  description: string = '';
  createdBy: string = '';
  communityCategory: string = '';
  newCategoryName: string = '';

  constructor(
    public bsModalRef: BsModalRef,
    private httpService: CategoryService,
    private router: Router
  ) {}

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
      },
    });
  }

  @Output() categoryCreated: EventEmitter<Category> =
    new EventEmitter<Category>();

  createCategory() {
    // alert('selected community category' + this.selectedCommunityCategory);
    if (this.selectedCommunityCategory != 'other') {
      this.newCategoryName = this.selectedCommunityCategory;
      // alert('inside - name : ' + this.newCategoryName);
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

          this.router.navigate(
            ['/community-management-dashboard/category-management'],
            { queryParams: { sortType: 'communityCategoryName' } }
          );
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
