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

  deleteCategoryMapping(id: number): Observable<any> {
    return this.http.delete(
      `https://localhost:7160/api/CommunityCategoryMapping/${id}`
    );
  }
}
