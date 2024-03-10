import { Component, Input, OnInit } from '@angular/core';
import { Produit } from '../../models/produit';
import { ModifierShopComponent } from '../modifier-shop/modifier-shop.component';
import { ProduitsGetResponseDTO } from '../../dtos/responses/produits/ProduitsGetResponseDTO';
import { ProduitsService } from '../../services/produits.service';
import { RouterModule } from '@angular/router';
import { SupprimerItemShopComponent } from '../supprimer-item-shop/supprimer-item-shop.component';

@Component({
  selector: 'app-item-shop',
  standalone: true,
  imports: [ModifierShopComponent, RouterModule, SupprimerItemShopComponent],
  templateUrl: './item-shop.component.html',
  styleUrl: './item-shop.component.scss',
})
export class ItemShopComponent implements OnInit {
  @Input({ required: true, alias: 'produit' }) panierProduit!: Produit;
  catalogueProduit!: ProduitsGetResponseDTO;
  loading: boolean = true;

  constructor(private produitsService: ProduitsService) {}

  ngOnInit(): void {
    this.loading = true;
    this.produitsService
      .getOne(this.panierProduit.id_produit_catalogue)
      .subscribe({
        next: (p) => {
          this.catalogueProduit = p;
          this.loading = false;
        },
        error: (e) => {
          this.loading = false;
        },
      });
  }
}
