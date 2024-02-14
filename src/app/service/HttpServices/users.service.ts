import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environments/environment';

export interface AllUsers {
  users: {
    userID: string;
    name: string;
    email: string;
    score: number;
    departmentID: number | null;
    department: null | string;
    designationID: number | null;
    designation: null | string;
    isDeleted: boolean;
    createdBy: null | string;
    createdAt: string | null;
    modifiedBy: null | string;
    modifiedAt: null | string;
  }[];
  totalCount: number;
  totalPages: number;
}

export interface User {
  userID: string;
  name: string;
  email: string;
  score: number;
  departmentName: string | null;
  designationName: string | null;
  roleName: string | null;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}
  apiurl: string = environment.apiUrl;
  BASE_URL = this.apiurl + 'users/GetAllUsersWithPagination';

  getUsers(
    page: number,
    sortType: string,
    term: string | null = null
  ): Observable<AllUsers> {
    const url = `${this.BASE_URL}?sort=${sortType}&page=${page}&limit=10`;
    console.log(url);
    return this.http.get<AllUsers>(url);
  }
  getAUser(page: number, name: string): Observable<AllUsers> {
    const startIndex = page;
    const userName = name;
    const url = `${this.BASE_URL}?term=${userName}&sort=Name&page=${startIndex}&limit=10`;
    return this.http.get<AllUsers>(url);
  }
  getUserByID(userID: string): Observable<User> {
    return this.http.get<User>(this.apiurl + `users/${userID}`);
  }
}
