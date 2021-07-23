import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


export interface Task {
  id?: number
  title: string
  description?: string
  position: string
  listId: number
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) { }
  
  addTask(board: Task): Observable<Task> {
    return this.http.post<Task>('http://localhost:3333/lists', board)
  }

  removeTask(id: number):Observable<void> {
    return this.http.delete<void>(`http://localhost:3333/lists/${id}`)
  }

  updateTask(id: number, something: string): Observable<Task> {
    return this.http.put<Task>(`http://localhost:3333/lists/${id}`, { name: something})
  }
}
