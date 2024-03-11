import { Component, Input, OnInit } from '@angular/core';
import { ProduitsService } from '../../../../../services/produits.service';
import { ProduitsPaginerResponseDTO } from '../../../../../dtos/responses/produits/ProduitsPaginerResponseDTO';
import { ProduitsGetResponseDTO } from '../../../../../dtos/responses/produits/ProduitsGetResponseDTO';

@Component({
  selector: 'app-afficher-produit',
  standalone: true,
  imports: [],
  templateUrl: './afficher.component.html',
  styleUrl: './afficher.component.scss',
})
export class AfficherComponent implements OnInit {
  @Input({ required: true }) id!: number;
  produit!: ProduitsGetResponseDTO;

  constructor(private produitsService: ProduitsService) {}
  ngOnInit(): void {
    this.produitsService.getOne(this.id).subscribe({
      next: (e) => {
        this.produit = e;
      },
    });
  }
}
