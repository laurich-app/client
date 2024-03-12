import {
  Component,
  EventEmitter,
  Inject,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { ProduitsFournisseursResponseDTO } from '../../../../dtos/responses/fournisseurs/ProduitsFournisseursResponseDTO';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ProduitsGetResponseDTO } from '../../../../dtos/responses/produits/ProduitsGetResponseDTO';
import { ProduitsPaginerResponseDTO } from '../../../../dtos/responses/produits/ProduitsPaginerResponseDTO';
import { ProduitsService } from '../../../../services/produits.service';
import {
  MatPaginator,
  MatPaginatorModule,
  PageEvent,
} from '@angular/material/paginator';
import { PaginateRequestDTO } from '../../../../dtos/requests/PaginateRequestDTO';
import { PaginateResponseDTO } from '../../../../dtos/responses/PaginateResponseDTO';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { AfficherComponent } from './afficher/afficher.component';

@Component({
  selector: 'app-liste-produits',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatCheckboxModule,
  ],
  templateUrl: './liste-produits.component.html',
  styleUrl: './liste-produits.component.scss',
})
export class ListeProduitsComponent {
  displayedColumns: string[] = ['id', 'libelle', 'prix_unitaire', 'actions'];
  produitsPaginer: ProduitsPaginerResponseDTO[] = [];

  isLoading = false;

  pageSize!: number;
  currentPage!: number;
  totalItems!: number;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    public dialogRef: MatDialogRef<ListeProduitsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProduitsFournisseursResponseDTO[],
    private produitsService: ProduitsService
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getData(this.currentPage, this.pageSize);
  }

  getData(page: number, pageSize: number) {
    this.isLoading = true;
    let form: PaginateRequestDTO = { page: page, limit: pageSize };
    this.produitsService
      .getAll(form)
      .subscribe((p: PaginateResponseDTO<ProduitsPaginerResponseDTO>) => {
        this.produitsPaginer = p.data;
        this.totalItems = p.pagination.nbItem;
        this.isLoading = false;
      });
  }

  ngOnInit(): void {
    this.pageSize = 5;
    this.currentPage = 0;
    this.totalItems = 0;
    this.getData(this.currentPage, this.pageSize);
  }

  isContained(produit: ProduitsPaginerResponseDTO): boolean {
    return this.data.find((p) => p.id_produit_catalogue == produit.id)
      ? true
      : false;
  }

  onChangeElement(produit: ProduitsPaginerResponseDTO) {
    const p = this.data.findIndex(
      (prod) => prod.id_produit_catalogue == produit.id
    );

    if (p == -1)
      this.data.push({
        prix_unitaire_fournisseur: produit.prix_unitaire,
        id_produit_catalogue: produit.id,
      });
    else
      this.data = [
        ...this.data.slice(0, p),
        ...this.data.slice(p + 1, this.data.length),
      ];
  }
}
