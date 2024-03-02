import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { PageEvent } from '@angular/material/paginator';
import { UtilisateursService } from '../../services/utilisateurs.service';
import { UtilisateurResponseDTO } from '../../dtos/responses/utilisateurs/UtilisateurResponseDTO';
import { PaginateResponseDTO } from '../../dtos/responses/PaginateResponseDTO';
import { PaginateRequestDTO } from '../../dtos/requests/PaginateRequestDTO';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-utilisateurs',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatProgressSpinnerModule],
  templateUrl: './utilisateurs.component.html',
  styleUrl: './utilisateurs.component.scss',
})
export class UtilisateursComponent implements OnInit {
  displayedColumns: string[] = ['id', 'email', 'pseudo'];
  utilisateurs: UtilisateurResponseDTO[] = [];

  isLoading = false;

  pageSize!: number;
  currentPage!: number;
  totalItems!: number;

  constructor(private utilisateursService: UtilisateursService) {}

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getData(this.currentPage, this.pageSize);
  }

  getData(page: number, pageSize: number) {
    this.isLoading = true;
    let form: PaginateRequestDTO = { page: page, limit: pageSize };
    this.utilisateursService
      .getAll(form)
      .subscribe((p: PaginateResponseDTO<UtilisateurResponseDTO>) => {
        this.utilisateurs = p.data;
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
