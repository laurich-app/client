import { Component, ViewChild } from '@angular/core';
import { NotificationResponseDTO } from '../../dtos/responses/notifications/NotificationResponseDTO';
import { NotificationsService } from '../../services/notifications.service';
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

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatButtonModule,
    RouterLink,
  ],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.scss',
})
export class NotificationsComponent {
  displayedColumns: string[] = ['_id', 'email', 'etat', 'actions'];
  notifications: NotificationResponseDTO[] = [];

  isLoading = false;

  pageSize!: number;
  currentPage!: number;
  totalItems!: number;

  constructor(private notificationService: NotificationsService) {}

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getData(this.currentPage, this.pageSize);
  }

  getData(page: number, pageSize: number) {
    this.isLoading = true;
    let form: PaginateRequestDTO = { page: page, limit: pageSize };
    this.notificationService
      .getAll(form)
      .subscribe((p: PaginateResponseDTO<NotificationResponseDTO>) => {
        this.notifications = p.data;
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
