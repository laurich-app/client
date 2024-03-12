import { Component, OnInit } from '@angular/core';
import { CommandeResponseDTO } from '../../../dtos/responses/commandes/CommandeResponseDTO';
import { CommandesService } from '../../../services/commandes.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-id',
  standalone: true,
  imports: [],
  templateUrl: './id.component.html',
  styleUrl: './id.component.scss',
})
export class IdComponent implements OnInit {
  id!: string;
  commande!: CommandeResponseDTO;
  loading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private commandesService: CommandesService
  ) {}

  ngOnInit(): void {
    const routeId = this.route.snapshot.paramMap.get('id');
    if (routeId) {
      this.id = routeId;

      this.loading = true;
      this.commandesService.get(this.id).subscribe({
        next: (e) => {
          this.commande = e;
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
