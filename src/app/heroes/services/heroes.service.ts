import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, delay, of } from "rxjs";
import { Hero } from "../interfaces/heroes.interface";
import { baseUrl } from "../../../environments/environments";


@Injectable({providedIn: 'root'})
export class HeroesService {
  private baseURL = baseUrl

  constructor(private http: HttpClient){}

  getHeroes(): Observable<Hero[]>{
    return this.http.get<Hero[]>(`${this.baseURL}/heroes`)
  }

  getHerobyId(id : string): Observable<Hero | undefined>{
    return this.http.get<Hero>(`${this.baseURL}/heroes/${id}`).pipe(
      catchError( error => of(undefined))
    )
  }

  getSuggestions( query: string): Observable<Hero[]>{
    return this.http.get<Hero[]>(`${this.baseURL}/heroes?q=${query}&_limit=6`)
  }
}






