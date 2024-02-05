// category-modal.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Categories, CategoryService } from '../HttpServices/category.service';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  currentPage: number = 1;
  pageCount: number = 1;
  sortType: string = 'communityCategoryName';
  constructor(private httpService: CategoryService) {}
  private dataSourceSubject: BehaviorSubject<any[]> = new BehaviorSubject<
    any[]
  >([]);
  dataSource$: Observable<any[]> = this.dataSourceSubject.asObservable();

  // Function to update the data source with new data
  updateDataSource(newData: any[]): void {
    this.dataSourceSubject.next(newData);
  }

  // Function to append new data to the existing data source
  appendToDataSource(newItem: any): void {
    const currentData = this.dataSourceSubject.value;
    const newData = [...currentData, newItem];
    this.dataSourceSubject.next(newData);
  }

  // Function to update existing data in the data source
  updateExistingData(updatedItem: any): void {
    const currentData = this.dataSourceSubject.value;
    const updatedData = currentData.map((item) =>
      item.id === updatedItem.id ? updatedItem : item
    );
    this.dataSourceSubject.next(updatedData);
  }

  categories: Categories[] = [];
  //categories pagination api
  loadCategories() {
    this.httpService
      .getPagedCategories(this.currentPage, this.sortType)
      .subscribe((data) => {
        this.categories = data.categories;
        this.updateDataSource(data);
        this.pageCount = data.totalPages;
        console.log(this.pageCount);
      });
  }
}
