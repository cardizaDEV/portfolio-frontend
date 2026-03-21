import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../enviroments/enviroment';
import { Technology } from '../models/technology.model';
import { TechnologyCategory } from '../models/technology-category.model';

@Injectable({ providedIn: 'root' })
export class TechnologyService {
  private url = environment.apiUrl + '/technologies';

  private technologiesCache: Technology[] | null = null;
  private categoriesCache: TechnologyCategory[] | null = null;

  constructor(private http: HttpClient) {}

  getTechnologies(): Observable<Technology[]> {
    if (this.technologiesCache) {
      return of(this.technologiesCache);
    }
    return this.http
      .get<Technology[]>(`${this.url}/all`)
      .pipe(tap((data) => (this.technologiesCache = data)));
  }

  getTechnologiesPaginated(
    page = 0,
    size = 10,
    sortBy = 'id',
  ): Observable<{ content: Technology[]; totalPages: number; totalElements: number }> {
    return this.http.get<{ content: Technology[]; totalPages: number; totalElements: number }>(
      this.url,
      {
        params: { page, size, sortBy },
      },
    );
  }

  getCategories(): Observable<TechnologyCategory[]> {
    if (this.categoriesCache) {
      return of(this.categoriesCache);
    }
    return this.http
      .get<TechnologyCategory[]>(`${this.url}/categories`)
      .pipe(tap((data) => (this.categoriesCache = data)));
  }

  clearCache(): void {
    this.technologiesCache = null;
    this.categoriesCache = null;
  }
}
