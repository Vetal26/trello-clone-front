import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { config } from '../../../config';
import { User_Board } from './board.service';
import { TokenStorageService } from './token-storage.service';

export interface User {
  id?: number;
  email: string;
  password?: string;
  User_Task?: [];
  User_Board?: User_Board;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private tokenService: TokenStorageService,
    private router: Router
  ) {}

  login(user: User): Observable<any> {
    return this.http
      .post(
        `http://${config.development.host}:${config.development.port}/login`,
        user
      )
      .pipe(
        tap((data) => {
          this.authUser(data);
        })
      );
  }

  signup(user: User): Observable<any> {
    return this.http
      .post(
        `http://${config.development.host}:${config.development.port}/register`,
        user
      )
      .pipe(
        tap((data) => {
          this.authUser(data);
        })
      );
  }

  logout() {
    this.http
      .post(
        `http://${config.development.host}:${config.development.port}/logout`,
        {}
      )
      .subscribe(() => {
        this.tokenService.signOut();
      });
  }

  isAuthenticated(): boolean {
    return !!this.tokenService.getToken();
  }

  loginWithGoogle() {
    return this.http.get(
      `http://${config.development.host}:${config.development.port}/auth/google`
    );
  }

  refreshToken() {
    return this.http
      .post(
        `http://${config.development.host}:${config.development.port}/refresh`,
        { refreshToken: this.tokenService.getRefreshToken() }
      )
      .pipe(
        tap((data) => {
          this.authUser(data);
        }),
        catchError((error) => {
          this.doLogoutUser();
          return of(false);
        })
      );
  }

  private authUser(data: any) {
    this.tokenService.saveUserId(data.refresh.UserId);
    this.tokenService.saveToken(data.token);
    this.tokenService.saveRefreshToken(data.refresh.token);
  }

  private doLogoutUser() {
    this.tokenService.signOut();
    this.router.navigate(['/login']);
  }
}
