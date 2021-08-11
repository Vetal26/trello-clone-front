import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './auth.service';


export interface Task {
  id?: number
  title: string
  description?: string
  isArchved: boolean
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
  
  addTask(task: Task): Observable<Task> {
    return this.http.post<Task>('http://localhost:3001/tasks', task)
  }

  removeTask(ids: number[]):Observable<any> {
    return this.http.delete<any>(`http://localhost:3001/tasks`, { body: ids})
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

  restoreTask(task: Task): Observable<Task> {
    return this.http.put<Task>(`http://localhost:3001/tasks/restore/${task.id}`, task)
  }
}
