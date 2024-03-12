import { Component } from '@angular/core';
import { ModifierCategoriesRequestDTO } from '../../../../dtos/requests/categories/ModifierCategoriesRequestDTO';
import { CategoriesResponseDTO } from '../../../../dtos/responses/categories/CategoriesResponseDTO';
import { CategoriesService } from '../../../../services/categories.service';
import { Error } from '../../../../models/error';
import { Store } from '@ngrx/store';
import { Router, ActivatedRoute } from '@angular/router';
import { NOTIFICATION_CONDITION } from '../../../../store/notification.action';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-modifier',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
  ],
  templateUrl: './modifier.component.html',
  styleUrl: './modifier.component.scss',
})
export class ModifierComponent {
  errors: Error = {};
  formData: ModifierCategoriesRequestDTO = {
    libelle: '',
  };
  // Objet pour stocker les données du formulaire
  id!: number;
  categorie!: CategoriesResponseDTO;
  loading: boolean = true;

  constructor(
    private categoriesService: CategoriesService,
    private router: Router,
    private store: Store<{}>,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const routeId = this.route.snapshot.paramMap.get('id');
    if (routeId && Number(routeId)) {
      this.id = Number(routeId);

      this.loading = true;
      this.categoriesService.get(this.id).subscribe({
        next: (e) => {
          this.categorie = e;
          this.formData = { ...this.categorie };
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
    this.categoriesService.update(this.formData, this.id).subscribe({
      next: (v) => {
        this.loading = false;
        this.store.dispatch(
          NOTIFICATION_CONDITION({
            message: 'La catégorie a bien été ajouté',
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
