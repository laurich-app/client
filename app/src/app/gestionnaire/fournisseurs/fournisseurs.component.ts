import { Component, ViewChild } from '@angular/core';
import { FournisseursResponseDTO } from '../../dtos/responses/fournisseurs/FournisseursResponseDTO';
import { FournisseursService } from '../../services/fournisseurs.service';
import {
  MatPaginator,
  MatPaginatorModule,
  PageEvent,
} from '@angular/material/paginator';
import { PaginateRequestDTO } from '../../dtos/requests/PaginateRequestDTO';
import { PaginateResponseDTO } from '../../dtos/responses/PaginateResponseDTO';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { SupprimerComponent } from './id/supprimer/supprimer.component';

@Component({
  selector: 'app-fournisseurs',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatButtonModule,
    RouterLink,
    SupprimerComponent,
  ],
  templateUrl: './fournisseurs.component.html',
  styleUrl: './fournisseurs.component.scss',
})
export class FournisseursComponent {
  displayedColumns: string[] = ['id', 'email', 'raison_sociale', 'actions'];
  fournisseurs: FournisseursResponseDTO[] = [];

  isLoading = false;

  pageSize!: number;
  currentPage!: number;
  totalItems!: number;

  constructor(private fournisseursService: FournisseursService) {}

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getData(this.currentPage, this.pageSize);
  }

  getData(page: number, pageSize: number) {
    this.isLoading = true;
    let form: PaginateRequestDTO = { page: page, limit: pageSize };
    this.fournisseursService
      .getAll(form)
      .subscribe((p: PaginateResponseDTO<FournisseursResponseDTO>) => {
        this.fournisseurs = p.data;
        this.totalItems = p.pagination.nbItem;
        this.isLoading = false;
      });
  }

  ngOnInit(): void {
    this.pageSize = 5;
    this.currentPage = 1;
    this.totalItems = 0;
    this.getData(this.currentPage, this.pageSize);
  }

  reload(): void {
    this.getData(this.currentPage, this.pageSize);
  }
}
