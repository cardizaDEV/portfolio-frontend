import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../enviroments/enviroment';
import { Comment } from '../models/comment.model';

@Injectable({ providedIn: 'root' })
export class CommentService {
  private url = environment.apiUrl + '/comments';

  constructor(private http: HttpClient) {}

  getComments(): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.url}/all`);
  }

  getCommentsPaginated(
    page = 0,
    size = 10,
    sortBy = 'id',
  ): Observable<{ content: Comment[]; totalPages: number; totalElements: number }> {
    return this.http.get<{ content: Comment[]; totalPages: number; totalElements: number }>(
      this.url,
      {
        params: { page, size, sortBy },
      },
    );
  }
}
