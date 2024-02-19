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
  getAllTags(): Observable<any> {
    return this.http.get(this.apiurl + `Tag?true`);
  }
}
