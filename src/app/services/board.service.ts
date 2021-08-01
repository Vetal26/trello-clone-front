import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TaskList } from './task-list.service';

export interface Board {
  id: number
  name: string
  TaskLists: TaskList[]
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
    return this.http.get<Board[]>('http://localhost:3001/boards', {params: new HttpParams().set('userId', userId)})
  }

  fetchBoard(id: number): Observable<Board> {
    return this.http.get<Board>(`http://localhost:3001/boards/${id}`)
  }
  
  addBoard(board: any): Observable<Board> {
    return this.http.post<Board>('http://localhost:3001/boards', board)
  }

  removeBoard(id: number):Observable<void> {
    return this.http.delete<void>(`http://localhost:3001/boards/${id}`)
  }

  renameBoard(board: Board): Observable<Board> {
    return this.http.patch<Board>(`http://localhost:3001/boards/${board.id}`, board)
  }
}
