import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './auth.service';


export interface Task {
  id?: number
  title: string
  description?: string
  position?: number
  taskListId?: number
  Users: User[]
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) { }

  fetchTask(id: number): Observable<Task> {
    return this.http.get<Task>(`http://localhost:3001/tasks/${id}`)
  }
  
  addTask(task: {}): Observable<Task> {
    return this.http.post<Task>('http://localhost:3001/tasks', task)
  }

  removeTask(id: number):Observable<void> {
    return this.http.delete<void>(`http://localhost:3001/tasks/${id}`)
  }

  updateTask(task: Task): Observable<Task> {
    return this.http.put<Task>(`http://localhost:3001/tasks/${task.id}`, task)
  }

  assignUser(body: any): Observable<any> {
    return this.http.patch<any>('http://localhost:3001/tasks/assign', body)
  }

  deleteAssignedUser(body: any): Observable<any> {
    return this.http.delete<any>('http://localhost:3001/tasks/assign', {params: new HttpParams().appendAll({['userId']: body.userId, ['taskId']: body.taskId})})
  }
}
