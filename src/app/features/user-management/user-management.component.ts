import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/HttpServices/users.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css'],
})
export class UserManagementComponent implements OnInit {

  sortOptions= ['Name','Score', 'Department', 'Designation', 'CreatedAt'];
  sortType:string = 'name';
  title:string = 'usersPage';
  searchText:string = '';
  users: any[] = [];
  currentPage:number = 1; 
  pageCount:number = 1;
  constructor(private userService: UserService, private http:HttpClient) {}

  ngOnInit() {
    this.loadUsers();
  }
  getSingleUser() {
    if (this.searchText == '') {
      this.loadUsers();
    }
    else{
    this.userService.getAUser( this.currentPage,this.searchText,).subscribe((data) => {
      this.users = data.users;
      this.pageCount = data.totalPages;      
    });
  }}

  loadUsers() {
    this.userService.getUsers(this.currentPage, this.sortType).subscribe((data) => {
      this.users = data.users;  
      this.pageCount = data.totalPages;  
      console.log(this.pageCount)  ;
    });
  }

  nextPage() {
    if (this.currentPage <= this.pageCount - 1) {
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
  displayUserName(name:string):void{
    window.alert("go to "+name+"'s page");
  }
  
    onSortSelectionChange(selectedValue: string) {           
      this.sortType = selectedValue;
      this.loadUsers();
    }
  
}
