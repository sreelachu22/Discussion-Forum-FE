import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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

  getCategories(): Observable<any> {
    return this.http.get(`https://localhost:7160/api/CommunityCategory`);
  }

  createCategory(communityCategoryName: string): Observable<any> {
    const body = {};

    return this.http.post(
      `https://localhost:7160/api/CommunityCategory/${communityCategoryName}`,
      body
    );
  }

  deleteCategory(id: number): Observable<any> {
    return this.http.delete(
      `https://localhost:7160/api/CommunityCategory/${id}`
    );
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

    return this.http.put(
      `https://localhost:7160/api/CommunityCategory/${id}`,
      body
    );
  }
}
