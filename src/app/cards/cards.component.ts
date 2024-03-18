import { Component, OnInit } from '@angular/core';
import { LocalService } from '../local.service';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.scss'
})
export class CardsComponent implements OnInit {
  items = [];

  constructor(
    private localStore: LocalService
  ) {}

  ngOnInit(): void {
    const localItems = this.localStore.getData('apiItems');
    if (localItems) {
      this.items = JSON.parse(localItems);
      console.log(this.items);
    } else {
      this.getPosts();
    }
  }

  async getPosts() {
    const url = 'https://the-mexican-food-db.p.rapidapi.com/';
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': 'be008e54a7msh7677d9bc94318fap1de8eejsn913fb13e390d',
        'X-RapidAPI-Host': 'the-mexican-food-db.p.rapidapi.com'
      }
    };

    try {
      const response = await fetch(url, options);
      const result = await response.text();
      this.localStore.saveData('apiItems', result);
      this.items = JSON.parse(result);
      console.log(this.items);
    } catch (error) {
      console.error(error);
    }
  }
}
