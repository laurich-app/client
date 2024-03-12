import { Component } from '@angular/core';
import { CategoriesResponseDTO } from '../../../dtos/responses/categories/CategoriesResponseDTO';
import { CategoriesService } from '../../../services/categories.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-id',
  standalone: true,
  imports: [],
  templateUrl: './id.component.html',
  styleUrl: './id.component.scss',
})
export class IdComponent {
  id!: number;
  categorie!: CategoriesResponseDTO;
  loading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private categoriesService: CategoriesService
  ) {}

  ngOnInit(): void {
    const routeId = this.route.snapshot.paramMap.get('id');
    if (routeId && Number(routeId)) {
      this.id = Number(routeId);

      this.loading = true;
      this.categoriesService.get(this.id).subscribe({
        next: (e) => {
          this.categorie = e;
          this.loading = false;
        },
        error: () => {
          // TO DO : rediriger vers page 404. A créer.
          this.loading = false;
        },
      });
    }
  }
}
