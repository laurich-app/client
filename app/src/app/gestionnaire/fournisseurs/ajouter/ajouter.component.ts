import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Error } from '../../../models/error';
import { CreerFournisseurRequestDTO } from '../../../dtos/requests/fournisseurs/CreerFournisseurRequestDTO';
import { FournisseursService } from '../../../services/fournisseurs.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { NOTIFICATION_CONDITION } from '../../../store/notification.action';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ListeProduitsComponent } from '../modals/liste-produits/liste-produits.component';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { AfficherComponent } from '../modals/liste-produits/afficher/afficher.component';

@Component({
  selector: 'app-ajouter',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatListModule,
    AfficherComponent,
  ],
  templateUrl: './ajouter.component.html',
  styleUrl: './ajouter.component.scss',
})
export class AjouterComponent {
  errors: Error = {};
  formData: CreerFournisseurRequestDTO = {
    email: '',
    raison_sociale: '',
    produits: [],
  };
  // Objet pour stocker les données du formulaire
  loading: boolean = false; // Variable pour indiquer si le chargement est en cours

  constructor(
    private fournisseursService: FournisseursService,
    private router: Router,
    private store: Store<{}>,
    public dialog: MatDialog
  ) {}

  getObjectKeys(obj: any): string[] {
    return Object.keys(obj);
  }

  submitForm() {
    this.loading = true; // Marquer le début du chargement

    // Envoyer les données du formulaire à un serveur via une requête HTTP POST
    this.fournisseursService.create(this.formData).subscribe({
      next: (v) => {
        this.loading = false;
        this.store.dispatch(
          NOTIFICATION_CONDITION({
            message: 'Le fournisseur a bien été ajouté',
          })
        );
        this.router.navigateByUrl('/gestionnaire/fournisseurs');
      },
      error: (e) => {
        console.log(e);
        if (e.status == 0)
          this.errors["Le service n'est pas démarré"] = e.message;
        this.loading = false;
      },
    });
  }

  ajouterProduits() {
    const dialogRef = this.dialog.open(ListeProduitsComponent, {
      data: JSON.parse(JSON.stringify(this.formData.produits)),
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) this.formData.produits = result;
    });
  }
}
