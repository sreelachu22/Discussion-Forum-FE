import { Component } from '@angular/core';
import { UserEditService } from 'src/app/user-edit.service';

interface User {
  email: string;
  name: string;
  designationID: number;
  score: number;
  departmentID: number;
  createdAt: Date;
}

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
})
export class UserEditComponent {
  constructor(private useredit: UserEditService) {}

  user: User | undefined; // Change to a single User, not an array

  ngOnInit() {
    this.useredit
      .getSingleUser('57CD2484-667C-4A15-BD81-015E8B464630')
      .subscribe({
        next: (data: User) => {
          this.user = data;
          console.log(this.user);
        },
        error: (error: Error) => {
          console.log('Error', error);
        },
      });
  }
}
