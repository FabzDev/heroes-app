import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Hero } from "../interfaces/heroes.interface";
import { baseUrl } from "../../../environments/environments";


@Injectable({providedIn: 'root'})
export class HeroesService {
  private baseURL = baseUrl

  constructor(private http: HttpClient){}

  getHeroes(): Observable<Hero[]>{
    return this.http.get<Hero[]>(`${this.baseURL}/heroes`)
  }
}






