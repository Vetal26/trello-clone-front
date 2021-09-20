import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TaskList } from './task-list.service';
import { User } from './auth.service';
import { config } from '../../../config';

export interface Board {
  id: number
  name: string
  TaskLists: TaskList[]
  Users: User[]
}

export interface User_Board {
  boardId?: number
  userId?: number
  owner: boolean
}

@Injectable({
  providedIn: 'root'
})

export class BoardService {

  constructor(private http: HttpClient) { }

  getUserId(): string | number | null {
    return localStorage.getItem('userId')
  }

  fetchBoards(userId: any): Observable<Board[]> {
    return this.http.get<Board[]>(`http://${config.development.host}:${config.development.port}/boards`, {params: new HttpParams().set('userId', userId)})
  }

  fetchBoard(id: number): Observable<Board> {
    return this.http.get<Board>(`http://${config.development.host}:${config.development.port}/boards/${id}`)
  }
  
  addBoard(board: any): Observable<Board> {
    return this.http.post<Board>(`http://${config.development.host}:${config.development.port}/boards`, board)
  }

  removeBoard(id: number):Observable<any> {
    return this.http.delete<any>(`http://${config.development.host}:${config.development.port}/boards/${id}`)
  }

  renameBoard(board: Board): Observable<Board> {
    return this.http.patch<Board>(`hhttp://${config.development.host}:${config.development.port}/boards/${board.id}`, board)
  }
}
