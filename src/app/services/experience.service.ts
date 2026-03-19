import { Injectable } from '@angular/core';
import { environment } from '../../enviroments/enviroment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({ providedIn: 'root' })
export class ExperienceService {
  private url = environment.apiUrl + '/experiences';

  constructor(private http: HttpClient) {}

  getExperiences(): Observable<any> {
    return this.http.get(`${this.url}/all`);
  }

  getExperiencesPaginated(page = 0, size = 10, sortBy = 'id'): Observable<any> {
    return this.http.get(this.url, {
      params: { page, size, sortBy },
    });
  }
}