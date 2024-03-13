import { Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {
  MatPaginatorModule,
  MatPaginator,
  PageEvent,
} from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { PaginateRequestDTO } from '../../dtos/requests/PaginateRequestDTO';
import { PaginateResponseDTO } from '../../dtos/responses/PaginateResponseDTO';
import { CommandeResponseDTO } from '../../dtos/responses/commandes/CommandeResponseDTO';
import { CommandesService } from '../../services/gestionnaires/commandes.service';

@Component({
  selector: 'app-gestionnaires-commandes',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatButtonModule,
    RouterLink,
  ],
  templateUrl: './commandes.component.html',
  styleUrl: './commandes.component.scss',
})
export class CommandesComponent {
  displayedColumns: string[] = ['_id', 'etat_livraison', 'total', 'actions'];
  commandes: CommandeResponseDTO[] = [];

  isLoading = false;

  pageSize!: number;
  currentPage!: number;
  totalItems!: number;

  constructor(private commandesService: CommandesService) {}

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getData(this.currentPage, this.pageSize);
  }

  getData(page: number, pageSize: number) {
    this.isLoading = true;
    let form: PaginateRequestDTO = { page: page, limit: pageSize };
    this.commandesService
      .getAll(form)
      .subscribe((p: PaginateResponseDTO<CommandeResponseDTO>) => {
        this.commandes = p.data;
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
