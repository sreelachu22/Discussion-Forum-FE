import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent {
  searchTerm: string = '';
  InputChange(event: any) {
    console.log(event);
    this.searchTerm = event;
    this.searchResult();
  }
  constructor(private router: Router) {}

  searchResult() {
    console.log(this.searchTerm);
    this.router.navigate(['/search-result'], {
      queryParams: { searchTerm: this.searchTerm },
    });
  }
}
