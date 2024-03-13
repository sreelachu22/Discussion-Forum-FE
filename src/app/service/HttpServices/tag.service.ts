import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TagService {
  constructor(private http: HttpClient) {}
  apiurl: string = environment.apiUrl;
  sortOrder:string = "asc";
  pageNumber:number = 1;

  getAllTags(): Observable<any> {
    return this.http.get(this.apiurl + `Tag?true`);
  }

  getTagsWithSearchAndSort(inputSortOrder:string, inputPageNumber:number):Observable<any>{
    this.sortOrder = inputSortOrder;
    this.pageNumber = inputPageNumber;
    return this.http.get(this.apiurl+ `Tag/PaginatedTagsWithSearchAndSort?isdel=false&sortOrder=${this.sortOrder}&pageNumber=${this.pageNumber}&pageSize=15`)
  }
}
