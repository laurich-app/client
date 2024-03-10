import { Component } from '@angular/core';
import { ItemShopComponent } from './item-shop/item-shop.component';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Panier } from '../models/panier';
import { LetDirective } from '@ngrx/component';
import { MatButtonModule } from '@angular/material/button';
import { REMOVE_PANIER_EFFECTS } from '../store/panier.action';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-panier',
  standalone: true,
  imports: [ItemShopComponent, LetDirective, MatButtonModule, MatDividerModule],
  templateUrl: './panier.component.html',
  styleUrl: './panier.component.scss',
})
export class PanierComponent {
  panier$: Observable<Panier>;

  constructor(private store: Store<{ panier: Panier }>) {
    this.panier$ = this.store.select('panier');
  }

  supprimerPanier() {
    this.store.dispatch(REMOVE_PANIER_EFFECTS());
  }

  validerPanier() {}
}
