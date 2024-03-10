import { Component, Input, OnInit } from '@angular/core';
import { AjouterProduit, Produit } from '../models/produit';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import {
  ProduitStockResponseDTO,
  ProduitsPaginerResponseDTO,
} from '../dtos/responses/produits/ProduitsPaginerResponseDTO';
import { CREATE_PANIER_EFFECTS } from '../store/panier.action';
import { Store } from '@ngrx/store';
import { Panier } from '../models/panier';
import { AjouterShopComponent } from '../panier/ajouter-shop/ajouter-shop.component';
import { MatListModule, MatSelectionListChange } from '@angular/material/list';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-produits',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    AjouterShopComponent,
    MatListModule,
    RouterModule,
  ],
  templateUrl: './produits.component.html',
  styleUrl: './produits.component.scss',
})
export class ProduitsComponent implements OnInit {
  @Input({ required: true, alias: 'produit' })
  produit!: ProduitsPaginerResponseDTO;
  stock!: ProduitStockResponseDTO;

  ngOnInit(): void {
    this.stock = this.produit.stock[0];
  }

  selectedCouleur(e: MatSelectionListChange) {
    const r = this.produit.stock.find((s) => s.couleur == e.options[0].value);
    if (r) this.stock = r;
  }
}
