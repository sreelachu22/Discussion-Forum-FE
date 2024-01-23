import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {}

  getCategories(id: number): Observable<any> {
    return this.http.get(
      `https://localhost:7160/api/CommunityCategoryMapping/InCommunity/${id}`
    );
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
    createdBy: string
  ): Observable<any> {
    const body = {
      communityCategoryId: communityCategoryId,
      description: description,
      createdBy: createdBy,
    };

    return this.http.post(
      `https://localhost:7160/api/CommunityCategoryMapping/CreateWithCategoryName/${id}`,
      body
    );
  }

  deleteCategoryMapping(id: number): Observable<any> {
    return this.http.delete(
      `https://localhost:7160/api/CommunityCategoryMapping/${id}`
    );
  }
}
