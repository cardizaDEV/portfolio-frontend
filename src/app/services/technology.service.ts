import { Injectable } from '@angular/core';
import { environment } from '../../enviroments/enviroment';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class TechnologyService {
  private url = environment.apiUrl + '/technologies';

  private technologiesCache: any[] | null = null;

  constructor(private http: HttpClient) {}

  getTechnologies(): Observable<any[]> {
    if (this.technologiesCache) {
      return of(this.technologiesCache);
    } else {
      return this.http.get<any[]>(`${this.url}/all`).pipe(
        tap((data) => {
          this.technologiesCache = data;
        }),
      );
    }
  }

  getTechnologiesPaginated(page = 0, size = 10, sortBy = 'id'): Observable<any> {
    return this.http.get(this.url, {
      params: { page, size, sortBy },
    });
  }

  clearCache() {
    this.technologiesCache = null;
  }
}
