import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThreadService {
  constructor(private http: HttpClient) {}

  getThread(id: number): Observable<any> {
    return this.http.get(
      `https://localhost:7160/api/Thread?CommunityCategoryMappingID=${id}`
    );
  }
}
