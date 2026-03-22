import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { shareReplay, startWith, switchMap, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Technology } from '../models/technology.model';
import { TechnologyCategory } from '../models/technology-category.model';
import { TranslateService } from '@ngx-translate/core';

@Injectable({ providedIn: 'root' })
export class TechnologyService {
  private url = environment.apiUrl + '/technologies';
  private technologiesCache: Map<string, Technology[]> = new Map();
  private categoriesCache: Map<string, TechnologyCategory[]> = new Map();

  readonly technologies$: Observable<Technology[]>;
  readonly categories$: Observable<TechnologyCategory[]>;

  constructor(
    private http: HttpClient,
    private translate: TranslateService,
  ) {
    this.technologies$ = this.translate.onLangChange.pipe(
      startWith(null),
      switchMap(() => this.getTechnologies()),
      shareReplay(1),
    );

    this.categories$ = this.translate.onLangChange.pipe(
      startWith(null),
      switchMap(() => this.getCategories()),
      shareReplay(1),
    );
  }

  private get lang(): string {
    return this.translate.currentLang ?? 'es';
  }

  private get headers() {
    return { headers: { 'Accept-Language': this.lang } };
  }

  getTechnologies(): Observable<Technology[]> {
    if (this.technologiesCache.has(this.lang)) {
      return of(this.technologiesCache.get(this.lang)!);
    }
    return this.http
      .get<Technology[]>(`${this.url}/all`, this.headers)
      .pipe(tap((data) => this.technologiesCache.set(this.lang, data)));
  }

  getTechnologiesPaginated(
    page = 0,
    size = 10,
    sortBy = 'id',
  ): Observable<{ content: Technology[]; totalPages: number; totalElements: number }> {
    return this.http.get<{ content: Technology[]; totalPages: number; totalElements: number }>(
      this.url,
      { params: { page, size, sortBy }, ...this.headers },
    );
  }

  getCategories(): Observable<TechnologyCategory[]> {
    if (this.categoriesCache.has(this.lang)) {
      return of(this.categoriesCache.get(this.lang)!);
    }
    return this.http
      .get<TechnologyCategory[]>(`${this.url}/categories`, this.headers)
      .pipe(tap((data) => this.categoriesCache.set(this.lang, data)));
  }
}
