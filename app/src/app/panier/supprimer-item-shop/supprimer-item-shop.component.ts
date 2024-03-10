import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { REMOVE_PRODUIT_EFFECTS } from '../../store/panier.action';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-supprimer-item-shop',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './supprimer-item-shop.component.html',
  styleUrl: './supprimer-item-shop.component.scss',
})
export class SupprimerItemShopComponent {
  @Input() id!: number;
  @Input() couleur!: string;

  constructor(private store: Store) {}

  supprimer() {
    this.store.dispatch(
      REMOVE_PRODUIT_EFFECTS({ id: this.id, couleur: this.couleur })
    );
  }
}
