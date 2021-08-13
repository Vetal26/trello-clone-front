import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { config } from '../../../config';

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
    return this.http.post(`http://${config.development.host}:${config.development.port}/login`, user)
    .pipe(
      tap((response) => {
        this.setToken(response)
        this.setUserId(response)
      })
    )
  }

  signup(user: User): Observable<any> {
    return this.http.post(`http://${config.development.host}:${config.development.port}/register`, user)
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
    return this.http.get(`http://${config.development.host}:${config.development.port}/auth/google`)
  }
}
