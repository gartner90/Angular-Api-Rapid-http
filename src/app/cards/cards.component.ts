import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.scss'
})
export class CardsComponent implements OnInit {
  items: object[] = [];
  form: any;
  showForm = false;
  currentItem = {ind: 0, title: null};

  constructor(
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    const localItems = window.localStorage.getItem('apiItems');
    if (localItems) {
      this.items = JSON.parse(localItems);
      console.log(this.items);
    } else {
      this.getPosts();
    }

    this.form = this.formBuilder.group({
      titulo: ['', Validators.required],
      imagen: ['', Validators.required],
      dificultad: ['', Validators.required]
    });
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
      window.localStorage.setItem('apiItems', result);
      this.items = JSON.parse(result);
    } catch (error) {
      console.error(error);
    }
  }

  submitForm(): void {
    if (this.form?.valid) {
      console.log('Form data:', this.form.value);
      const obj = {
        id: Math.random().toString(36).slice(-6),
        title: this.form.get('titulo').value,
        difficulty: this.form.get('dificultad').value,
        image: this.form.get('imagen').value,
      };

      if (this.currentItem.title) {
        this.items[this.currentItem.ind] = obj;
      } else {
        this.items.unshift(obj);
      }
      
      this.saveData();
      this.cancel();
    }
  }

  delete(ind: number) {
    this.items.splice(ind, 1);
    this.saveData();
  }

  edit(item: any, ind: any) {
    this.form.controls['titulo'].setValue(item.title);
    this.form.controls['imagen'].setValue(item.image);
    this.form.controls['dificultad'].setValue(item.difficulty);
    this.currentItem = item;
    this.currentItem.ind = ind;
    this.showForm = true;
    window.scroll({ 
      top: 0, 
      left: 0, 
      behavior: 'smooth' 
    });
  }

  cancel() {
    this.currentItem = {ind: 0, title: null};
    this.showForm = false;
    this.form.reset();
  }

  saveData() {
    localStorage.setItem('apiItems', JSON.stringify(this.items));
  }
}
