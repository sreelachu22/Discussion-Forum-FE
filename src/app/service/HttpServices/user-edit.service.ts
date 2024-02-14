import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserEditService {
  constructor(private http: HttpClient) {}
  apiurl: string = environment.apiUrl;
  //single user details fetch api

  getSingleUser(id: string): Observable<any> {
    return this.http.get(this.apiurl + `users/${id}`);
  }

  //get available user roles
  getUserRoles(): Observable<any> {
    return this.http.get(this.apiurl + `Role`);
  }

  //post single user role
  changeUserRole(
    userId: string,
    roleId: number,
    adminId: string
  ): Observable<any> {
    const apiUrl = this.apiurl + `users/${userId}`;
    console.log('hello');

    const params = new HttpParams()
      .set('RoleID', roleId.toString())
      .set('AdminID', adminId);

    return this.http.put(apiUrl, null, { params });
  }
}
