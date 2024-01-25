import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}
  BASE_URL = 'https://localhost:7160/api/users';
  getUsers(page: number, sortType:string): Observable<AllUsers> {    
    const url = `${this.BASE_URL}?term=a&sort=${sortType}&page=${page}&limit=10`;
    console.log(this.http.get(url));
    return this.http.get<AllUsers>(url);
  }
  getAUser(page: number,name: string): Observable<AllUsers> {
    const startIndex = page;
    const userName = name;
    const url = `${this.BASE_URL}?term=${userName}&sort=Name&page=${startIndex}&limit=10`;
    return this.http.get<AllUsers>(url);
  }
}
