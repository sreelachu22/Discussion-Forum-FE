import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface AllCategories {
  categories: {
    communityCategoryMappingID: number;
    communityID: number;
    communityCategoryID: number;
    communityCategoryName: string | null;
    description: string;
    isDeleted: boolean;
    createdBy: string | null;
    createdAt: string | null;
    modifiedBy: string | null;
    modifiedAt: string | null;
    threadCount: number | null;
  }[];
  totalCount: number;
  totalPages: number;
}
@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private http: HttpClient) {}

  getTopUsers(limit: number): Observable<any> {
    return this.http.get(
      `https://localhost:7160/api/users/TopUsersByScore/${limit}`
    );
  }
}
