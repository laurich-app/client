import { Component, OnInit } from '@angular/core';
import { ProduitsGetResponseDTO } from '../../../dtos/responses/produits/ProduitsGetResponseDTO';
import { ProduitsService } from '../../../services/produits.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-id',
  standalone: true,
  imports: [],
  templateUrl: './id.component.html',
  styleUrl: './id.component.scss',
})
export class IdComponent implements OnInit {
  id!: number;
  produit!: ProduitsGetResponseDTO;
  loading: boolean = true;

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
          this.loading = false;
        },
        error: () => {
          // TO DO : rediriger vers page 404. A créer.
          this.loading = false;
        },
      });
    }
  }
}
