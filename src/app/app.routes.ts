import { Routes } from '@angular/router';
import { CardsComponent } from './cards/cards.component';

export const routes: Routes = [
    { path: '', component: CardsComponent },
    { path: '**', component: CardsComponent },
];