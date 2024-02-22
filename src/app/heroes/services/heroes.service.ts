import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { Hero } from '../interfaces/heroes.interface';
import { baseUrl } from '../../../environments/environments';

@Injectable({ providedIn: 'root' })
export class HeroesService {
  private baseURL = baseUrl;

  constructor(private http: HttpClient) {}

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(`${this.baseURL}/heroes`);
  }

  getHerobyId(id: string): Observable<Hero | undefined> {
    return this.http
      .get<Hero>(`${this.baseURL}/heroes/${id}`)
      .pipe(catchError((error) => of(undefined)));
  }

  getSuggestions(query: string): Observable<Hero[]> {
    return this.http.get<Hero[]>(`${this.baseURL}/heroes?q=${query}&_limit=6`);
  }

  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(`${this.baseURL}/heroes`, hero);
  }

  updateHero(hero: Hero): Observable<Hero> {
    if (!hero.id) throw new Error("'hero.id' is required");

    return this.http.patch<Hero>(`${this.baseURL}/heroes/${hero.id}`, hero);
  }

  deleteHeroById(hero: Hero): Observable<boolean> {
    return this.http.delete(`${this.baseURL}/heroes/${hero.id}`)
    .pipe(
      map(() => true),
      catchError((error) => of(false)),
    );
  }
}
