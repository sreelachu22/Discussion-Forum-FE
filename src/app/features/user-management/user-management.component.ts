import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserService } from './users.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {

  title = 'usersPage';
  searchText:string = '';
  users: any[] = [];
  currentPage = 1; 
  pageCount:number = 1;
  constructor(private userService: UserService, private http:HttpClient) {}

  ngOnInit() {
    this.loadUsers();
  }
  getSingleUser() {
    if (this.searchText == ""){
      this.loadUsers();
    }
    this.userService.getAUser(this.searchText, this.currentPage).subscribe((data) => {
      this.users = data.users;      
    });
  }

  loadUsers() {
    this.userService.getUsers(this.currentPage).subscribe((data) => {
      this.users = data.users;  
      this.pageCount = data.totalPages;  
      console.log(this.pageCount)  ;
    });
    // this.http.get('https://localhost:7160/api/users', { observe: 'response' }).subscribe(response => {
    //   // const xTotalCount = response.headers.get('X-Total-Count');
    //   console.log(response.headers.get('X-Total-Count'));
    // });
  } 

  nextPage() {
    if (this.currentPage <= this.pageCount-1){
    this.currentPage++;
    this.loadUsers();
  }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadUsers();
    }
  }
}

