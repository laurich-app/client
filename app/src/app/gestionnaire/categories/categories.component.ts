import { Component, ViewChild } from '@angular/core';
import { CategoriesResponseDTO } from '../../dtos/responses/categories/CategoriesResponseDTO';
import { CategoriesService } from '../../services/categories.service';
import {
  MatPaginator,
  MatPaginatorModule,
  PageEvent,
} from '@angular/material/paginator';
import { PaginateRequestDTO } from '../../dtos/requests/PaginateRequestDTO';
import { PaginateResponseDTO } from '../../dtos/responses/PaginateResponseDTO';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { SupprimerComponent } from './id/supprimer/supprimer.component';

@Component({
  selector: 'app-categories',
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
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
})
export class CategoriesComponent {
  displayedColumns: string[] = ['id', 'libelle', 'nb_produits', 'actions'];
  categories: CategoriesResponseDTO[] = [];

  isLoading = false;

  pageSize!: number;
  currentPage!: number;
  totalItems!: number;

  constructor(private categoriesService: CategoriesService) {}

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getData(this.currentPage, this.pageSize);
  }

  getData(page: number, pageSize: number) {
    this.isLoading = true;
    let form: PaginateRequestDTO = { page: page, limit: pageSize };
    this.categoriesService
      .getAll(form)
      .subscribe((p: PaginateResponseDTO<CategoriesResponseDTO>) => {
        this.categories = p.data;
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

  reload(): void {
    this.getData(this.currentPage, this.pageSize);
  }
}
