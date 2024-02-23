import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces/user.interface';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { baseUrl  } from '../../../environments/environments';

@Injectable({providedIn: 'root'})
export class AuthService {

  private apiUrl: string = baseUrl;
  private user? : User;

  constructor(private httpClient: HttpClient) { }

  get currentUser(): User | undefined{
    if(!this.user) return undefined;
    return structuredClone(this.user);
  }

  login(em: string, pass: string): Observable<User>{
    // http.post(url, user.mail, password)
    return this.httpClient.get<User>(`${this.apiUrl}/users/aO7Hf43q.HlO89hYT.bGf9pQz8`)
    .pipe(
      tap(user => this.user = user),
      tap(user => localStorage.setItem('token', user.id.toString())),
      tap(user => console.log(user))
    )
  }

  logout(): void {
    this.user = undefined;
    localStorage.clear();
  }

  checkAuthenticated(): Observable<boolean>{
    if(!localStorage.getItem('token')) return of(false);

    return this.httpClient.get<User>(`${this.apiUrl}/users/aO7Hf43q.HlO89hYT.bGf9pQz8`)
    .pipe(
      tap(user => this.user = user),
      map(user => !!user),
      catchError(err => of(false))
    )

  }


}
