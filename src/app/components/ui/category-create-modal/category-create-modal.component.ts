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
    const id = 1; // Adjust the id as needed

    const body = {
      communityCategoryId: this.selectedCommunityCategory,
      description: this.description,
      createdBy: this.createdBy,
    };

    this.httpService
      .createCategoryDescription(
        id,
        body.description,
        body.communityCategoryId,
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
