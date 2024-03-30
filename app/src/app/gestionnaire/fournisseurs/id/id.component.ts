import { Component, OnInit } from '@angular/core';
import { FournisseursResponseDTO } from '../../../dtos/responses/fournisseurs/FournisseursResponseDTO';
import { FournisseursService } from '../../../services/fournisseurs.service';
import { ActivatedRoute } from '@angular/router';
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
  fournisseur!: FournisseursResponseDTO;
  loading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private fournisseursService: FournisseursService
  ) {}

  ngOnInit(): void {
    const routeId = this.route.snapshot.paramMap.get('id');
    if (routeId) {
      this.id = routeId;

      this.loading = true;
      this.fournisseursService.get(this.id).subscribe({
        next: (e) => {
          this.fournisseur = e;
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
