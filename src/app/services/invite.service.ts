import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { config } from '../../../config';

@Injectable({
  providedIn: 'root'
})
export class InviteService {

  constructor(private http: HttpClient) { }

  fetchKey(boardId: any): Observable<string> {
    return this.http.get<string>(`http://${config.development.host}:${config.development.port}/invite/${boardId}`)
  }

  fetchOwnerBoard(key: string): Observable<any> {
    return this.http.get<any>(`http://${config.development.host}:${config.development.port}/invite/key/${key}`)
  }

  joinBoard(body: any): Observable<any> {
    return this.http.post(`http://${config.development.host}:${config.development.port}/invite`, body)
  }
}
