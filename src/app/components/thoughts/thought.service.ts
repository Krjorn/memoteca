import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Thought } from './thought';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThoughtService {
  private readonly API = 'http://localhost:3000/thoughts';

  constructor(private http: HttpClient) {}

  list(page: number, filter: string, favoriteOnly: boolean): Observable<Thought[]> {
    const itemsPerPage = 6;
    let params = new HttpParams()
      .set('_page', page)
      .set('_limit', itemsPerPage);

    if(filter.trim().length > 2) {
      params = params.set('q', filter);
    }

    if(favoriteOnly) {
      params = params.set('favorite', true);
    }

    // return this.http.get<Thought[]>(`${this.API}?_page=${page}&_limit=${itemsPerPage}`);
    return this.http.get<Thought[]>(this.API, { params });
  }

  create(thought: Thought): Observable<Thought> {
    return this.http.post<Thought>(this.API, thought);
  }

  delete(id: number): Observable<Thought> {
    const url = `${this.API}/${id}`;
    return this.http.delete<Thought>(url);
  }

  edit(thought: Thought): Observable<Thought> {
    const url = `${this.API}/${thought.id}`;
    return this.http.put<Thought>(url, thought);
  }

  toggleFavorite(thought: Thought): Observable<Thought> {
    thought.favorite = !thought.favorite;
    return this.edit(thought);
  }

  searchById(id: number): Observable<Thought> {
    const url = `${this.API}/${id}`;
    return this.http.get<Thought>(url);
  }
}
