import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { shareReplay, startWith, switchMap, tap } from 'rxjs/operators';
import { environment } from '../../enviroments/enviroment';
import { Experience } from '../models/experience.model';
import { TranslateService } from '@ngx-translate/core';

@Injectable({ providedIn: 'root' })
export class ExperienceService {
  private url = environment.apiUrl + '/experiences';
  private experiencesCache: Map<string, Experience[]> = new Map();

  readonly experiences$: Observable<Experience[]>;

  constructor(
    private http: HttpClient,
    private translate: TranslateService,
  ) {
    this.experiences$ = this.translate.onLangChange.pipe(
      startWith(null),
      switchMap(() => this.getExperiences()),
      shareReplay(1),
    );
  }

  private get lang(): string {
    return this.translate.currentLang ?? 'es';
  }

  private get headers() {
    return { headers: { 'Accept-Language': this.lang } };
  }

  getExperiences(): Observable<Experience[]> {
    if (this.experiencesCache.has(this.lang)) {
      return of(this.experiencesCache.get(this.lang)!);
    }
    return this.http
      .get<Experience[]>(`${this.url}/all`, this.headers)
      .pipe(tap((data) => this.experiencesCache.set(this.lang, data)));
  }

  getExperiencesPaginated(
    page = 0,
    size = 10,
    sortBy = 'id',
  ): Observable<{ content: Experience[]; totalPages: number; totalElements: number }> {
    return this.http.get<{ content: Experience[]; totalPages: number; totalElements: number }>(
      this.url,
      { params: { page, size, sortBy }, ...this.headers },
    );
  }
}
