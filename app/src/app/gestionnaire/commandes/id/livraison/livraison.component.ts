import { Component, Input, OnInit } from '@angular/core';
import { CommandeResponseDTO } from '../../../../dtos/responses/commandes/CommandeResponseDTO';
import { EtatLivraison } from '../../../../enums/etat_livraison.enum';
import { MatSelectModule } from '@angular/material/select';
import { CommandesService } from '../../../../services/gestionnaires/commandes.service';
import { Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { NOTIFICATION_CONDITION } from '../../../../store/notification.action';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-livraison',
  standalone: true,
  imports: [MatSelectModule, FormsModule, MatInputModule],
  templateUrl: './livraison.component.html',
  styleUrl: './livraison.component.scss',
})
export class LivraisonComponent implements OnInit {
  @Input({ required: true }) commande!: CommandeResponseDTO;
  etat_livraisons: EtatLivraison[] = Object.values(EtatLivraison);
  etat: EtatLivraison = EtatLivraison.EN_ATTENTE;

  ngOnInit(): void {
    this.etat = this.commande.etat_livraison;
  }

  constructor(
    private commandesService: CommandesService,
    private router: Router,
    private store: Store<{}>
  ) {}

  onEtatLivraisonSelectionChange(event: any) {
    this.etat = event.value;
  }

  onSubmit() {
    this.commandesService
      .updateLivraison(this.commande._id, { etat_livraison: this.etat })
      .subscribe({
        next: (e) => {
          this.store.dispatch(
            NOTIFICATION_CONDITION({
              message: 'Livraison mise à jours',
            })
          );
          this.router.navigateByUrl('/gestionnaire/commandes');
        },
      });
  }
}
