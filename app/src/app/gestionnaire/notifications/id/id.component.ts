import { Component, OnInit } from '@angular/core';
import { NotificationResponseDTO } from '../../../dtos/responses/notifications/NotificationResponseDTO';
import { NotificationsService } from '../../../services/notifications.service';
import { ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import dayjs from 'dayjs';
import 'dayjs/locale/fr'; // Importer le module de localisation français

@Component({
  selector: 'app-id',
  standalone: true,
  imports: [MatCardModule, MatListModule],
  templateUrl: './id.component.html',
  styleUrl: './id.component.scss',
})
export class IdComponent implements OnInit {
  id!: string;
  notification!: NotificationResponseDTO;
  loading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private notificationService: NotificationsService
  ) {}

  ngOnInit(): void {
    const routeId = this.route.snapshot.paramMap.get('id');
    if (routeId) {
      this.id = routeId;

      this.loading = true;
      this.notificationService.get(this.id).subscribe({
        next: (e) => {
          this.notification = e;
          this.loading = false;
        },
        error: () => {
          // TO DO : rediriger vers page 404. A créer.
          this.loading = false;
        },
      });
    }
  }

  // Fonction pour formater la date en français
  formatDate(): string {
    // Définir la locale en français
    dayjs.locale('fr');

    // Analyser la chaîne de caractères de date
    const date = dayjs(this.notification.date_creation);

    // Formater la date en français
    const formattedDate = date.format('DD MMMM YYYY [à] HH[h]mm');

    return `Le ${formattedDate}`;
  }
}
