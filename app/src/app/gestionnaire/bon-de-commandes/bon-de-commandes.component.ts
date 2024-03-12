import { Component, OnInit, ViewChild } from '@angular/core';
import { BonDeCommandesService } from '../../services/bon-de-commandes.service';
import { BonCommandesResponseDTO } from '../../dtos/responses/bon_de_commandes/BonCommandesResponseDTO';
import {
  MatPaginator,
  MatPaginatorModule,
  PageEvent,
} from '@angular/material/paginator';
import { PaginateRequestDTO } from '../../dtos/requests/PaginateRequestDTO';
import { PaginateResponseDTO } from '../../dtos/responses/PaginateResponseDTO';
import { UtilisateurResponseDTO } from '../../dtos/responses/utilisateurs/UtilisateurResponseDTO';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-bon-de-commandes',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatIconModule,
    RouterLink,
  ],
  templateUrl: './bon-de-commandes.component.html',
  styleUrl: './bon-de-commandes.component.scss',
})
export class BonDeCommandesComponent implements OnInit {
  displayedColumns: string[] = [
    '_id',
    'date_creation',
    'quantite',
    'produit.libelle',
    'etat_commande',
    'actions',
  ];
  bon_de_commandes: BonCommandesResponseDTO[] = [];

  isLoading = false;

  pageSize!: number;
  currentPage!: number;
  totalItems!: number;

  constructor(private bonDeCommandesService: BonDeCommandesService) {}

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getData(this.currentPage, this.pageSize);
  }

  getData(page: number, pageSize: number) {
    this.isLoading = true;
    let form: PaginateRequestDTO = { page: page + 1, limit: pageSize };
    this.bonDeCommandesService
      .getAll(form)
      .subscribe((p: PaginateResponseDTO<BonCommandesResponseDTO>) => {
        this.bon_de_commandes = p.data;
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
}
