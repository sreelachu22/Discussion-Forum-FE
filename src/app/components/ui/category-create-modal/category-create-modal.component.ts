import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { CategoryService } from 'src/app/service/HttpServices/category.service';

@Component({
  selector: 'app-category-create-modal',
  templateUrl: './category-create-modal.component.html',
  styleUrls: ['./category-create-modal.component.css'],
})
export class CategoryCreateModalComponent implements OnInit {
  id: number = 1;
  categoriesNotInCommunity: {
    communityCategoryID: number;
    communityCategoryName: string;
  }[] = [];

  selectedCommunityCategory: number = 0;
  description: string = '';
  createdBy: string = '';
  newCategoryName: string = '';

  constructor(
    public bsModalRef: BsModalRef,
    private httpService: CategoryService
  ) {}

  ngOnInit() {
    this.getCategoriesNotinCommunity();
    // Fetch categoriesNotInCommunity from your service or provide it as an input
  }

  getCategoriesNotinCommunity() {
    this.httpService.getCategoriesNotInCommunity(this.id).subscribe({
      next: (data: any) => {
        this.categoriesNotInCommunity = data;
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

  @Output() categoryCreated: EventEmitter<any> = new EventEmitter<any>();

  createCategory() {
    const id = 1;
    // console.log('function called');
    // if (this.selectedCommunityCategory == -1) {
    //   const community = {
    //     communityCategoryName: this.newCategoryName,
    //   };

    //   this.httpService
    //     .createCategory(community.communityCategoryName)
    //     .subscribe({
    //       next: (data: any) => {
    //         console.log('Category created successfully:', data);
    //         this.selectedCommunityCategory = data.communityCategoryID;
    //         console.log('inside' + this.selectedCommunityCategory);
    //       },
    //       error: (error: any) => {
    //         console.error('Error creating category:', error);
    //         // Handle error as needed
    //       },
    //     });
    // }

    // console.log('outside' + this.selectedCommunityCategory);
    const body = {
      communityCategoryId: this.selectedCommunityCategory,
      communitCategoryName: this.newCategoryName,
      description: this.description,
      createdBy: this.createdBy,
    };

    this.httpService
      .createCategoryDescription(
        id,
        body.description,
        body.communityCategoryId,
        body.communitCategoryName,
        body.createdBy
      )
      .subscribe({
        next: (data: any) => {
          console.log('Category created successfully:', data);
          alert('New category added');
          this.categoryCreated.emit(data); // Emit event with created category data
          this.bsModalRef.hide(); // Close the modal after creating
        },
        error: (error: any) => {
          console.error('Error creating category:', error);
          // Handle error as needed
        },
      });
  }
}
