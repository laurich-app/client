import { Component, OnInit } from '@angular/core';
import { ModifierFournisseurRequestDTO } from '../../../../dtos/requests/fournisseurs/ModifierFournisseurRequestDTO';
import { Error } from '../../../../models/error';
import { Store } from '@ngrx/store';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { FournisseursService } from '../../../../services/fournisseurs.service';
import { NOTIFICATION_CONDITION } from '../../../../store/notification.action';
import { ListeProduitsComponent } from '../../modals/liste-produits/liste-produits.component';
import { FournisseursResponseDTO } from '../../../../dtos/responses/fournisseurs/FournisseursResponseDTO';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { AfficherComponent } from '../../modals/liste-produits/afficher/afficher.component';

@Component({
  selector: 'app-modifier',
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
  templateUrl: './modifier.component.html',
  styleUrl: './modifier.component.scss',
})
export class ModifierComponent implements OnInit {
  errors: Error = {};
  formData: ModifierFournisseurRequestDTO = {
    email: '',
    raison_sociale: '',
    produits: [],
  };
  // Objet pour stocker les données du formulaire
  id!: string;
  fournisseur!: FournisseursResponseDTO;
  loading: boolean = true;

  constructor(
    private fournisseursService: FournisseursService,
    private router: Router,
    private store: Store<{}>,
    public dialog: MatDialog,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const routeId = this.route.snapshot.paramMap.get('id');
    if (routeId) {
      this.id = routeId;

      this.loading = true;
      this.fournisseursService.get(this.id).subscribe({
        next: (e) => {
          this.fournisseur = e;
          this.formData = { ...this.fournisseur };
          this.loading = false;
        },
        error: () => {
          // TO DO : rediriger vers page 404. A créer.
          this.loading = false;
        },
      });
    }
  }

  getObjectKeys(obj: any): string[] {
    return Object.keys(obj);
  }

  submitForm() {
    this.loading = true; // Marquer le début du chargement

    // Envoyer les données du formulaire à un serveur via une requête HTTP POST
    this.fournisseursService.update(this.formData, this.id).subscribe({
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

  modifierProduits() {
    const dialogRef = this.dialog.open(ListeProduitsComponent, {
      data: JSON.parse(JSON.stringify(this.formData.produits)),
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) this.formData.produits = result;
    });
  }
}
