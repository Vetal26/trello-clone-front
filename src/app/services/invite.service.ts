import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InviteService {

  constructor(private http: HttpClient) { }

  fetchKey(boardId: any): Observable<string> {
    return this.http.get<string>(`http://localhost:3001/invite/${boardId}`)
  }

  fetchOwnerBoard(key: string): Observable<any> {
    return this.http.get<any>(`http://localhost:3001/invite/key/${key}`)
  }

  joinBoard(body: any): Observable<any> {
    return this.http.post('http://localhost:3001/invite', body)
  }
}
