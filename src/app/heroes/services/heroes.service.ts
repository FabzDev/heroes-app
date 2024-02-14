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
    return this.http.get<Hero>(`${baseUrl}/heroes/${id}`).pipe(
      delay(2000),
      catchError( error => of(undefined))
    )
  }
}






