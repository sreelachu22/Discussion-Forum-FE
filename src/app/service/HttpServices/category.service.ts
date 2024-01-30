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
  BASE_URL = 'https://localhost:7160/api/CommunityCategoryMapping';
  getPagedCategories(
    page: number,
    sortType: string
  ): Observable<AllCategories> {
    const url = `${this.BASE_URL}?communityID=1&term=a&sort=${sortType}&page=${page}&limit=10`;
    console.log(this.http.get(url));
    return this.http.get<AllCategories>(url);
  }
  getACategory(page: number, name: string): Observable<AllCategories> {
    const startIndex = page;
    const userName = name;
    const url = `${this.BASE_URL}?communityID=1&term=${userName}&sort=Name&page=${startIndex}&limit=10`;
    return this.http.get<AllCategories>(url);
  }

  getCategories(id: number): Observable<any> {
    return this.http.get(
      `https://localhost:7160/api/CommunityCategoryMapping/InCommunity/${id}`
    );
  }

  getCommunities(): Observable<any> {
    return this.http.get(`https://localhost:7160/api/Community`);
  }

  getCategoriesNotInCommunity(id: number): Observable<any> {
    return this.http.get(
      `https://localhost:7160/api/CommunityCategoryMapping/GetCategoriesNotInCommunity/${id}`
    );
  }

  updateCategoryDescription(
    id: number,
    description: string,
    modifiedBy: string
  ): Observable<any> {
    const body = {
      description: description,
      modifiedBy: modifiedBy,
    };

    return this.http.put(
      `https://localhost:7160/api/CommunityCategoryMapping/UpdateCategoryDescription/${id}`,
      body
    );
  }

  createCategoryDescription(
    id: number,
    description: string,
    communityCategoryId: number,
    communityCategoryName: string,
    createdBy: string
  ): Observable<any> {
    const body = {
      communityCategoryId: communityCategoryId,
      communityCategoryName: communityCategoryName,
      description: description,
      createdBy: createdBy,
    };

    return this.http.post(
      `https://localhost:7160/api/CommunityCategoryMapping/CreateCategoryMapping/${id}`,
      body
    );
  }

  createCategory(communityCategoryName: string): Observable<any> {
    const body = {};

    return this.http.post(
      `https://localhost:7160/api/CommunityCategory/${communityCategoryName}`,
      body
    );
  }

  deleteCategoryMapping(id: number): Observable<any> {
    return this.http.delete(
      `https://localhost:7160/api/CommunityCategoryMapping/${id}`
    );
  }
}
