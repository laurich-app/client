import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { CreerProduitsRequestDTO } from '../../../../dtos/requests/produits/CreerProduitsRequestDTO';
import { ProduitsGetResponseDTO } from '../../../../dtos/responses/produits/ProduitsGetResponseDTO';
import { Couleurs } from '../../../../enums/couleurs.enum';
import { Sexe } from '../../../../enums/sexe.enum';
import { Taille } from '../../../../enums/taille.enum';
import { ProduitsService } from '../../../../services/produits.service';
import { NOTIFICATION_CONDITION } from '../../../../store/notification.action';
import { Error } from '../../../../models/error';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { ModifierProduitsRequestDTO } from '../../../../dtos/requests/produits/ModifierProduitsRequestDTO';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { ProduitStockResponseDTO } from '../../../../dtos/responses/produits/ProduitsPaginerResponseDTO';
import { AjouterStockDTO } from '../../../../dtos/requests/produits/stocks/AjouterStockDTO';

@Component({
  selector: 'app-modifier',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
  ],
  templateUrl: './modifier.component.html',
  styleUrl: './modifier.component.scss',
})
export class ModifierComponent implements OnInit {
  errors: Error = {};
  sexes: Sexe[] = Object.values(Sexe);
  tailles: Taille[] = Object.values(Taille);
  couleurs: Couleurs[] = Object.values(Couleurs);

  displayedColumns: string[] = ['couleur', 'quantite', 'actions'];

  formData: ModifierProduitsRequestDTO = {
    libelle: '',
    prix_unitaire: 0,
    sexe: Sexe.FEMME,
    taille: Taille.L,
    image_url: '',
    description: '',
    categorie_id: 0,
  };
  formDataStock: AjouterStockDTO = {
    couleur: Couleurs.BLANC,
  };

  // Objet pour stocker les données du formulaire
  id!: number;
  produit!: ProduitsGetResponseDTO;
  loading: boolean = false; // Variable pour indiquer si le chargement est en cours

  constructor(
    private route: ActivatedRoute,
    private produitsService: ProduitsService,
    private router: Router,
    private store: Store<{}>
  ) {}

  ngOnInit(): void {
    const routeId = this.route.snapshot.paramMap.get('id');
    if (routeId && Number(routeId)) {
      this.id = Number(routeId);

      this.loadData();
    }
  }

  loadData() {
    this.loading = true;
    this.produitsService.getOne(this.id).subscribe({
      next: (e) => {
        this.produit = e;
        this.formData = { categorie_id: e.categorie.id, ...e };
        this.loading = false;
      },
      error: () => {
        // TO DO : rediriger vers page 404. A créer.
        this.loading = false;
      },
    });
  }

  supprimerStock(stock: ProduitStockResponseDTO) {
    if (window.confirm('Êtes-vous sur ? Cet action est irréversible')) {
      this.loading = true;
      this.produitsService.removeStock(stock.couleur, this.id).subscribe({
        next: (e) => {
          this.loadData();
        },
      });
    }
  }

  ajouterStock() {
    this.loading = true;
    this.produitsService.addStock(this.formDataStock, this.id).subscribe({
      next: (e) => {
        this.loadData();
      },
    });
  }

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
    this.formDataStock.couleur = event.value;
  }

  submitForm() {
    this.loading = true; // Marquer le début du chargement

    // Envoyer les données du formulaire à un serveur via une requête HTTP POST
    this.produitsService.update(this.formData, this.id).subscribe({
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
