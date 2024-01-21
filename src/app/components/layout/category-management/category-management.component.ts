import { Component } from '@angular/core';
import { HttpService } from 'src/app/service/http.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-category-management',
  templateUrl: './category-management.component.html',
  styleUrls: ['./category-management.component.css'],
})
export class CategoryManagementComponent {
  constructor(private httpService: HttpService) {}
  community_name: string = 'Experion Discussion';
  isRowHovered: number | null = null;

  onMouseEnter(index: number) {
    this.isRowHovered = index;
  }

  onMouseLeave() {
    this.isRowHovered = null;
  }

  categories: {
    communityCategoryMappingID: number;
    communityID: number;
    communityCategoryID: number;
    communityCategoryName: string;
    description: string;
    isDeleted: boolean;
    createdAt: Date;
    modifiedAt: Date;
  }[] = [];

  ngOnInit(): void {
    this.getDatas();
  }

  faIcon = faEdit;

  id: number = 1;
  getDatas() {
    this.httpService.getData(this.id).subscribe({
      next: (data: any) => {
        this.categories = data;
        console.log(data);
      },
      error: (error: Error) => {
        alert('Error has occured, ' + error.message);
      },
      complete: () => {
        console.log('Completed');
      },
    });
  }
}
