import { Component } from '@angular/core';

@Component({
  selector: 'app-community-page',
  templateUrl: './community-page.component.html',
  styleUrls: ['./community-page.component.css'],
})
export class CommunityPageComponent {
  cardsData: { title: string; content: string; numberOfPosts: number }[] = [
    {
      title: 'Card 1',
      content:
        "Some quick example text to build on the card title and make up the bulk of the card's content.",
      numberOfPosts: 100,
    },
    {
      title: 'Card 1',
      content:
        "Some quick example text to build on the card title and make up the bulk of the card's content.",
      numberOfPosts: 100,
    },
    {
      title: 'Card 1',
      content:
        "Some quick example text to build on the card title and make up the bulk of the card's content.",
      numberOfPosts: 100,
    },
    {
      title: 'Card 1',
      content:
        "Some quick example text to build on the card title and make up the bulk of the card's content.",
      numberOfPosts: 100,
    },
    // Add more data as needed
  ];
}
