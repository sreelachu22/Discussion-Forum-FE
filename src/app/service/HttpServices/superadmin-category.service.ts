import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environments/environment';

export interface Category {
  communityCategoryID: number;
  communityCategoryName: string | null;
  isDeleted: boolean;
}
@Injectable({
  providedIn: 'root',
})
export class superAdminCategoryService {
  constructor(private http: HttpClient) {}
  apiurl: string = environment.apiUrl;

  getCategories(): Observable<any> {
    return this.http.get(this.apiurl + `CommunityCategory`);
  }

  createCategory(communityCategoryName: string): Observable<any> {
    const body = {};

    return this.http.post(
      this.apiurl + `CommunityCategory/${communityCategoryName}`,
      body
    );
  }

  deleteCategory(id: number): Observable<any> {
    return this.http.delete(this.apiurl + `CommunityCategory/${id}`);
  }

  updateCategory(
    id: number,
    communityCategoryName: string,
    isDeleted: boolean
  ): Observable<any> {
    const body = {
      communityCategoryName: communityCategoryName,
      isDeleted: isDeleted,
    };

    return this.http.put(this.apiurl + `CommunityCategory/${id}`, body);
  }
}
