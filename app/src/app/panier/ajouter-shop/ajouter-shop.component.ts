import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AjouterProduit, Produit } from '../../models/produit';
import { Store } from '@ngrx/store';
import { ProduitsPaginerResponseDTO } from '../../dtos/responses/produits/ProduitsPaginerResponseDTO';
import { Panier } from '../../models/panier';
import {
  CREATE_PANIER_EFFECTS,
  MODIFY_QUANTITE_EFFECTS,
} from '../../store/panier.action';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Observable, exhaustMap, of, take } from 'rxjs';
import { PanierProduitResponseDTO } from '../../dtos/responses/paniers/PanierResponseDTO';
import { Couleurs } from '../../enums/couleurs.enum';

@Component({
  selector: 'app-ajouter-shop',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './ajouter-shop.component.html',
  styleUrl: './ajouter-shop.component.scss',
})
export class AjouterShopComponent implements OnChanges {
  @Input({ required: true, alias: 'id' }) id!: number;
  @Input({ required: true, alias: 'couleur' }) couleur!: Couleurs;
  @Input({ required: true, alias: 'stock' }) stock!: number;
  quantite: number = 1;
  found: PanierProduitResponseDTO | undefined;
  panier$: Observable<Panier>;

  constructor(private store: Store<{ panier: Panier }>) {
    this.panier$ = this.store.select('panier');
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Mettre à jour this.stock en comparant avec le produit s'il est déjà ajouté dans le panier.
    if (changes['stock']) {
      this.quantite = 1;
      this.panier$.subscribe({
        next: (e) => {
          const found = e.produits.find(
            (p) =>
              p.id_produit_catalogue == this.id &&
              p.couleurs.libelle == this.couleur
          );
          this.found = found;
          console.log(found);
          if (found) this.stock = this.stock - found.quantite;
        },
      });
    }
  }

  ajouterPanier() {
    const toPush = {
      id: this.id,
      couleur_choisi: this.couleur,
      quantite: this.quantite,
    };

    if (this.found) {
      const found = JSON.parse(JSON.stringify(this.found));
      return of(
        this.store.dispatch(
          MODIFY_QUANTITE_EFFECTS({
            update: {
              ...toPush,
              quantite: toPush.quantite + found.quantite,
            },
          })
        )
      );
    } else
      return of(
        this.store.dispatch(
          CREATE_PANIER_EFFECTS({
            produit: toPush,
          })
        )
      );
  }

  canIncrement(): boolean {
    return this.quantite < this.stock;
  }

  increment() {
    if (this.canIncrement()) this.quantite += 1;
  }

  decrement() {
    if (this.quantite > 1) this.quantite -= 1;
  }
}
