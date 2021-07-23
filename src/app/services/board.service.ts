import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

  fetchBoards(): Observable<Board[]> {
    return this.http.get<Board[]>('http://localhost:3333/boards')
  }

  fetchBoard(id: number): Observable<Board> {
    return this.http.get<Board>(`http://localhost:3333/boards/${id}`)
  }
  
  addBoard(board: any): Observable<Board> {
    return this.http.post<Board>('http://localhost:3333/boards', board)
  }

  removeBoard(id: number):Observable<void> {
    return this.http.delete<void>(`http://localhost:3333/boards/${id}`)
  }

  renameBoard(id: number, newName: string): Observable<Board> {
    return this.http.put<Board>(`http://localhost:3333/boards/${id}`, { name: newName})
  }
}
