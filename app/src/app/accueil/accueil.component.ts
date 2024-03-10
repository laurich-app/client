import { Component, OnInit, ViewChild } from '@angular/core';
import { ProduitsGetResponseDTO } from '../dtos/responses/produits/ProduitsGetResponseDTO';
import { ProduitsService } from '../services/produits.service';
import {
  MatPaginator,
  MatPaginatorModule,
  PageEvent,
} from '@angular/material/paginator';
import { PaginateRequestDTO } from '../dtos/requests/PaginateRequestDTO';
import { PaginateResponseDTO } from '../dtos/responses/PaginateResponseDTO';
import { UtilisateurResponseDTO } from '../dtos/responses/utilisateurs/UtilisateurResponseDTO';
import { ProduitsPaginerResponseDTO } from '../dtos/responses/produits/ProduitsPaginerResponseDTO';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { CREATE_PANIER_EFFECTS } from '../store/panier.action';
import { Store } from '@ngrx/store';
import { Panier } from '../models/panier';
import { ProduitsComponent } from '../produits/produits.component';

@Component({
  selector: 'app-accueil',
  standalone: true,
  imports: [
    MatPaginatorModule,
    MatProgressSpinnerModule,
    ProduitsComponent,
    MatGridListModule,
  ],
  templateUrl: './accueil.component.html',
  styleUrl: './accueil.component.scss',
})
export class AccueilComponent implements OnInit {
  produits: ProduitsPaginerResponseDTO[] = [];

  isLoading = false;

  pageSize!: number;
  currentPage!: number;
  totalItems!: number;

  constructor(private produitsService: ProduitsService) {}

  ngOnInit(): void {
    this.pageSize = 5;
    this.currentPage = 0;
    this.totalItems = 0;
    this.getData(this.currentPage, this.pageSize);
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

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
        this.produits = p.data;
        this.totalItems = p.pagination.nbItem;
        this.isLoading = false;
      });
  }
}
