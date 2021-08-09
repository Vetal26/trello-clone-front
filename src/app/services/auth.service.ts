import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators'

export interface User {
  id?: number,
  email: string,
  password?: string
  User_Task?: []
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private http: HttpClient) { }

  getToken(): string | null {
    return localStorage.getItem('token')
  }

  login(user: User): Observable<any> {
    return this.http.post('http://localhost:3001/login', user)
    .pipe(
      tap((response) => {
        this.setToken(response)
        this.setUserId(response)
      })
    )
  }

  signup(user: User): Observable<any> {
    return this.http.post('http://localhost:3001/register', user)
    .pipe(
      tap((response) => {
        this.setToken(response)
        this.setUserId(response)
      })
    )
  }

  logout() {
    this.setToken(null)
    this.setUserId(null)
  }

  isAuthenticated(): boolean {
    return !!this.getToken()
  }

  setToken(response: any) {
    if (response) {
      localStorage.setItem('token', response.token)
    } else {
      localStorage.clear()
    }
  }

  setUserId(response: any) {
    if (response) {
      localStorage.setItem('userId', response.userId)
    } else {
      localStorage.clear()
    }
  }

  loginWithGoogle() {
    return this.http.get('http://localhost:3001/auth/google')
  }
}
