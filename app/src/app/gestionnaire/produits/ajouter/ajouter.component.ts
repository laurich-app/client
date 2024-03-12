import { Component } from '@angular/core';
import { CreerProduitsRequestDTO } from '../../../dtos/requests/produits/CreerProduitsRequestDTO';
import { ProduitsService } from '../../../services/produits.service';
import { Error } from '../../../models/error';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { NOTIFICATION_CONDITION } from '../../../store/notification.action';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { Sexe } from '../../../enums/sexe.enum';
import { Taille } from '../../../enums/taille.enum';
import { Couleurs } from '../../../enums/couleurs.enum';

@Component({
  selector: 'app-ajouter',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
  ],
  templateUrl: './ajouter.component.html',
  styleUrl: './ajouter.component.scss',
})
export class AjouterComponent {
  errors: Error = {};
  sexes: Sexe[] = Object.values(Sexe);
  tailles: Taille[] = Object.values(Taille);
  couleurs: Couleurs[] = Object.values(Couleurs);

  formData: CreerProduitsRequestDTO = {
    libelle: '',
    prix_unitaire: 0,
    sexe: Sexe.FEMME,
    taille: Taille.L,
    image_url: '',
    description: '',
    couleurs: [],
    categorie_id: 0,
  };
  // Objet pour stocker les données du formulaire
  loading: boolean = false; // Variable pour indiquer si le chargement est en cours

  constructor(
    private produitsService: ProduitsService,
    private router: Router,
    private store: Store<{}>
  ) {}

  getObjectKeys(obj: any): string[] {
    return Object.keys(obj);
  }

  onSexeSelectionChange(event: any) {
    this.formData.sexe = event.value;
  }

  onTailleSelectionChange(event: any) {
    this.formData.taille = event.value;
  }

  onCouleursSelectionChange(event: any) {
    this.formData.couleurs = event.value;
  }

  submitForm() {
    this.loading = true; // Marquer le début du chargement

    // Envoyer les données du formulaire à un serveur via une requête HTTP POST
    this.produitsService.create(this.formData).subscribe({
      next: (v) => {
        this.loading = false;
        this.store.dispatch(
          NOTIFICATION_CONDITION({
            message: 'Le produit a bien été ajouté',
          })
        );
        this.router.navigateByUrl('/gestionnaire/produits');
      },
      error: (e) => {
        console.log(e);
        if (e.status == 0)
          this.errors["Le service n'est pas démarré"] = e.message;
        this.loading = false;
      },
    });
  }
}
