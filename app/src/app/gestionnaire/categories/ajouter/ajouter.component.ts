import { Component } from '@angular/core';
import { CategoriesService } from '../../../services/categories.service';
import { CreerCategoriesRequestDTO } from '../../../dtos/requests/categories/CreerCategoriesRequestDTO';
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

@Component({
  selector: 'app-ajouter',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
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
  formData: CreerCategoriesRequestDTO = {
    libelle: '',
  };
  // Objet pour stocker les données du formulaire
  loading: boolean = false; // Variable pour indiquer si le chargement est en cours

  constructor(
    private categoriesService: CategoriesService,
    private router: Router,
    private store: Store<{}>
  ) {}

  getObjectKeys(obj: any): string[] {
    return Object.keys(obj);
  }

  submitForm() {
    this.loading = true; // Marquer le début du chargement

    // Envoyer les données du formulaire à un serveur via une requête HTTP POST
    this.categoriesService.create(this.formData).subscribe({
      next: (v) => {
        this.loading = false;
        this.store.dispatch(
          NOTIFICATION_CONDITION({
            message: 'Le catégorie a bien été ajouté',
          })
        );
        this.router.navigateByUrl('/gestionnaire/categories');
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
