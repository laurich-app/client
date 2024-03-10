import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProduitsGetResponseDTO } from '../../dtos/responses/produits/ProduitsGetResponseDTO';
import { ProduitsService } from '../../services/produits.service';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatListModule, MatSelectionListChange } from '@angular/material/list';
import { ProduitStockResponseDTO } from '../../dtos/responses/produits/ProduitsPaginerResponseDTO';
import { AjouterShopComponent } from '../../panier/ajouter-shop/ajouter-shop.component';

@Component({
  selector: 'app-id',
  standalone: true,
  imports: [MatProgressSpinnerModule, AjouterShopComponent, MatListModule],
  templateUrl: './id.component.html',
  styleUrl: './id.component.scss',
})
export class IdComponent {
  id!: number;
  produit!: ProduitsGetResponseDTO;
  loading: boolean = true;
  stock!: ProduitStockResponseDTO;

  constructor(
    private route: ActivatedRoute,
    private produitsService: ProduitsService
  ) {}

  ngOnInit(): void {
    const routeId = this.route.snapshot.paramMap.get('id');
    if (routeId && Number(routeId)) {
      this.id = Number(routeId);

      this.loading = true;
      this.produitsService.getOne(this.id).subscribe({
        next: (e) => {
          this.produit = e;
          this.stock = this.produit.stock[0];
          this.loading = false;
        },
        error: () => {
          // TO DO : rediriger vers page 404. A créer.
          this.loading = false;
        },
      });
    }
  }

  selectedCouleur(e: MatSelectionListChange) {
    const r = this.produit.stock.find((s) => s.couleur == e.options[0].value);
    if (r) this.stock = r;
  }
}
