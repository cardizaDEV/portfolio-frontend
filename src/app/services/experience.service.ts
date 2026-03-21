import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../enviroments/enviroment';
import { Experience } from '../models/experience.model';

@Injectable({ providedIn: 'root' })
export class ExperienceService {
  private url = environment.apiUrl + '/experiences';

  private experiencesCache: Experience[] | null = null;

  constructor(private http: HttpClient) {}

  getExperiences(): Observable<Experience[]> {
    if (this.experiencesCache) {
      return of(this.experiencesCache);
    }
    return this.http
      .get<Experience[]>(`${this.url}/all`)
      .pipe(tap((data) => (this.experiencesCache = data)));
  }

  getExperiencesPaginated(
    page = 0,
    size = 10,
    sortBy = 'id',
  ): Observable<{ content: Experience[]; totalPages: number; totalElements: number }> {
    return this.http.get<{ content: Experience[]; totalPages: number; totalElements: number }>(
      this.url,
      {
        params: { page, size, sortBy },
      },
    );
  }

  clearCache(): void {
    this.experiencesCache = null;
  }
}
