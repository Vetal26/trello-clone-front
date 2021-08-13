import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './auth.service';
import { config } from '../../../config';

export interface Task {
  id: number
  title: string
  description?: string
  isArchved: boolean
  position?: number
  taskListId: number
  Users: User[]
  Activities: Activity[]
}

export interface Activity{
  TaskId: number
  activity: string
  createdAt: Date
}

export interface FindedTasks {
  searchTasks: Task[]
  searchUsers: Task[]
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) { }

  fetchTask(id: number): Observable<Task> {
    return this.http.get<Task>(`http://${config.development.host}:${config.development.port}/tasks/${id}`)
  }
  
  addTask(body: any): Observable<Task> {
    return this.http.post<Task>(`http://${config.development.host}:${config.development.port}/tasks`, body)
  }

  removeTask(ids: number[]):Observable<any> {
    return this.http.delete<any>(`http://${config.development.host}:${config.development.port}/tasks`, { body: ids})
  }

  updateTask(id: number, body: object): Observable<Task> {
    return this.http.put<Task>(`http://${config.development.host}:${config.development.port}/tasks/${id}`, body)
  }

  assignUser(body: any): Observable<any> {
    return this.http.patch<any>(`http://${config.development.host}:${config.development.port}/tasks/assign`, body)
  }

  deleteAssignedUser(body: any): Observable<any> {
    return this.http.delete<any>(`http://${config.development.host}:${config.development.port}/tasks/assign`, {params: new HttpParams().appendAll({['userId']: body.userId, ['taskId']: body.taskId})})
  }

  restoreTask(id: number, body: object): Observable<Task> {
    return this.http.put<Task>(`http://${config.development.host}:${config.development.port}/tasks/restore/${id}`, body)
  }

  search(boardId: number, searchText: string): Observable<FindedTasks> {
    return this.http.get<any>(`http://${config.development.host}:${config.development.port}/tasks/search`, {params: new HttpParams().appendAll({['boardId']: boardId, ['searchText']: searchText})})
  }
}
