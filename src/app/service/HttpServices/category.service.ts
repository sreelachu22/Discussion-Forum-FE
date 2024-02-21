import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environments/environment';

export interface AllCategories {
  categories: {
    communityCategoryMappingID: number;
    communityID: number;
    communityCategoryID: number;
    communityCategoryName: string | null;
    description: string;
    isDeleted: boolean;
    createdBy: string | null;
    createdAt: string;
    modifiedBy: string | null;
    modifiedAt: string | null;
    threadCount: number | null;
  }[];
  totalCount: number;
  totalPages: number;
}

export interface CommunityCategory {
  communityCategoryMappingID: number;
  communityID: number;
  communityCategoryID: number;
  communityCategoryName: string;
  description: string;
  isDeleted: boolean;
  createdAt: Date;
  modifiedAt: Date;
  threadCount: number;
}

export interface Categories {
  communityCategoryMappingID: number;
  communityID: number;
  communityCategoryID: number;
  communityCategoryName: string | null;
  description: string;
  isDeleted: boolean;
  createdBy: string | null;
  createdAt: string;
  modifiedBy: string | null;
  modifiedAt: string | null;
  threadCount: number | null;
}

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private http: HttpClient) {}
  apiurl: string = environment.apiUrl;

  BASE_URL = this.apiurl + 'CommunityCategoryMapping';

  term = '';
  //get paginated categories
  getPagedCategories(
    communityID: number,
    page: number,
    sortType: string
  ): Observable<any> {
    const term = '';
    const url = `${this.BASE_URL}?communityID=${communityID}&term=${term}&sort=${sortType}&page=${page}&limit=6`;
    return this.http.get<any>(url);
  }

  getACategory(page: number, name: string): Observable<AllCategories> {
    const startIndex = page;
    const userName = name;
    const url = `${this.BASE_URL}?communityID=1&term=${userName}&sort=Name&page=${startIndex}&limit=10`;
    return this.http.get<AllCategories>(url);
  }

  //get categories inside a community
  getCategories(id: number): Observable<any> {
    return this.http.get(
      this.apiurl + `CommunityCategoryMapping/InCommunity/${id}`
    );
  }

  getCategoriesNotInCommunity(id: number): Observable<any> {
    return this.http.get(
      this.apiurl + `CommunityCategoryMapping/GetCategoriesNotInCommunity/${id}`
    );
  }

  updateCategoryDescription(
    id: number,
    description: string,
    modifiedBy: string | null
  ): Observable<any> {
    const body = {
      description: description,
      modifiedBy: modifiedBy,
    };

    return this.http.put(
      this.apiurl + `CommunityCategoryMapping/UpdateCategoryDescription/${id}`,
      body
    );
  }

  createCategoryDescription(
    id: number,
    description: string,
    communityCategoryName: string,
    createdBy: string | null
  ): Observable<any> {
    const body = {
      communityCategoryName: communityCategoryName,
      description: description,
      createdBy: createdBy,
    };

    return this.http.post(
      this.apiurl + `CommunityCategoryMapping/CreateCategoryMapping/${id}`,
      body
    );
  }

  deleteCategoryMapping(id: number): Observable<any> {
    return this.http.delete(this.apiurl + `CommunityCategoryMapping/${id}`);
  }
}
