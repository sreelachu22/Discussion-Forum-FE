import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CommunityCategory } from 'src/app/service/HttpServices/category.service';

@Component({
  selector: 'app-category-card',
  templateUrl: './category-card.component.html',
  styleUrls: ['./category-card.component.css'],
})
export class CategoryCardComponent {
  constructor(private router: Router) {}

  @Input() categoriesList: CommunityCategory[] = [];

  navigateToPosts(communityCategoryMappingID: number) {
    this.router.navigate(['category_threads'], {
      queryParams: {
        communityCategoryMappingID: communityCategoryMappingID,
      },
    });
  }
}
