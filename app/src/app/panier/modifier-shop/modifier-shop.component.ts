import { Component, Input, OnInit } from '@angular/core';
import { Produit } from '../../models/produit';
import { Store } from '@ngrx/store';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ProduitsGetResponseDTO } from '../../dtos/responses/produits/ProduitsGetResponseDTO';
import { ProduitStockResponseDTO } from '../../dtos/responses/produits/ProduitsPaginerResponseDTO';
import { MODIFY_QUANTITE_EFFECTS } from '../../store/panier.action';

@Component({
  selector: 'app-modifier-shop',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './modifier-shop.component.html',
  styleUrl: './modifier-shop.component.scss',
})
export class ModifierShopComponent implements OnInit {
  @Input({ required: true, alias: 'panierProduit' }) panierProduit!: Produit;
  @Input({ required: true, alias: 'catalogueProduit' })
  catalogueProduit!: ProduitsGetResponseDTO;
  quantite: number = 1;
  previousQuantite!: number;
  stock!: ProduitStockResponseDTO;

  constructor(private store: Store) {}

  ngOnInit(): void {
    const r = this.catalogueProduit.stock.find(
      (p) => p.couleur == this.panierProduit.couleurs.libelle
    );
    if (r) this.stock = r;
    this.quantite = this.panierProduit.quantite;
    this.previousQuantite = this.quantite;
  }

  canUpdate(): boolean {
    return this.previousQuantite != this.quantite;
  }

  modifierPanier() {
    if (this.canUpdate()) {
      const toPush = {
        id: this.panierProduit.id_produit_catalogue,
        couleur_choisi: this.panierProduit.couleurs.libelle,
        quantite: this.quantite,
      };

      this.store.dispatch(
        MODIFY_QUANTITE_EFFECTS({
          update: {
            ...toPush,
          },
        })
      );
      this.previousQuantite = this.quantite;
    }
  }

  canIncrement(): boolean {
    return this.quantite < this.stock.quantite;
  }

  increment() {
    if (this.canIncrement()) this.quantite += 1;
  }

  decrement() {
    if (this.quantite > 1) this.quantite -= 1;
  }
}
