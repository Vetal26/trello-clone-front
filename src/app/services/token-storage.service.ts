import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TokenStorageService {
  constructor() {}

  signOut() {
    localStorage.clear();
  }

  saveToken(token: string): void {
    localStorage.removeItem('token');
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  saveRefreshToken(token: string): void {
    localStorage.removeItem('refreshToken');
    localStorage.setItem('refreshToken', token);
  }

  getRefreshToken(): string | null {
    return localStorage.getItem('refreshToken');
  }

  saveUserId(userId: any): void {
    localStorage.setItem('userId', userId);
  }

  getUserId(): any {
    return localStorage.getItem('userId');
  }
}
