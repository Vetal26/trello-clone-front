import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


export interface Task {
  id?: number
  title: string
  description?: string
  position?: number
  taskListId?: number
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) { }
  
  addTask(task: {}): Observable<Task> {
    return this.http.post<Task>('http://localhost:3001/tasks', task)
  }

  removeTask(id: number):Observable<void> {
    return this.http.delete<void>(`http://localhost:3001/tasks/${id}`)
  }

  updateTask(task: Task): Observable<Task> {
    return this.http.put<Task>(`http://localhost:3001/tasks/${task.id}`, task)
  }
}
