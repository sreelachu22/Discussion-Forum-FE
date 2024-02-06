import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserEditService {
  constructor(private http: HttpClient) {}

  getSingleUser(id: string): Observable<any> {
    return this.http.post(`https://localhost:7160/api/User/${id}`, id);
  }
}
