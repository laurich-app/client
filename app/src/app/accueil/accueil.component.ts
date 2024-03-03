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

@Component({
  selector: 'app-accueil',
  standalone: true,
  imports: [
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
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
    this.produits = [
      {
        id: 1,
        prix_unitaire: 12.34,
        sexe: 'M',
        taille: 'S',
        image_url:
          'https://s1.qwant.com/thumbr/300x300/8/3/dc0489d0924ae49d8c2f9cf7e4121f6b774a56fd110df042705d0f07105680/th.jpg?u=https%3A%2F%2Ftse.mm.bing.net%2Fth%3Fid%3DOIF.A%252fn8FoHLgodzkCk%252fM59Cpg%26pid%3DApi&q=0&b=1&p=0&a=0',
        description: "Un T shirt pour l'été",
        libelle: 'T shirt',
        couleurs: ['ROUGE', 'VERT'],
      },
    ];
    // Uncomment when ready
    // this.produitsService
    //   .getAll(form)
    //   .subscribe((p: PaginateResponseDTO<ProduitsPaginerResponseDTO>) => {
    //     this.produits = p.data;
    //     this.totalItems = p.pagination.nbItem;
    //     this.isLoading = false;
    //   });
  }
}
