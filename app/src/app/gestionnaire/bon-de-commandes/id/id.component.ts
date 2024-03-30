import { Component, OnInit } from '@angular/core';
import { BonCommandesResponseDTO } from '../../../dtos/responses/bon_de_commandes/BonCommandesResponseDTO';
import { ActivatedRoute } from '@angular/router';
import { BonDeCommandesService } from '../../../services/bon-de-commandes.service';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-id',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './id.component.html',
  styleUrl: './id.component.scss',
})
export class IdComponent implements OnInit {
  id!: string;
  bon_de_commande!: BonCommandesResponseDTO;
  loading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private bonDeCommandesService: BonDeCommandesService
  ) {}

  ngOnInit(): void {
    const routeId = this.route.snapshot.paramMap.get('id');
    if (routeId) {
      this.id = routeId;

      this.loading = true;
      this.bonDeCommandesService.get(this.id).subscribe({
        next: (e) => {
          this.bon_de_commande = e;
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
