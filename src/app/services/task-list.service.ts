import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from './task.service'

export interface TaskList {
  id?: number
  name: string
  boardId: number
  Tasks?: Task[]
}

@Injectable({
  providedIn: 'root'
})

export class TaskListService {

  constructor(private http: HttpClient) { }

  fetchTaskLists(): Observable<TaskList[]> {
    return this.http.get<TaskList[]>('http://localhost:3333/lists')
  }

  addTaskList(board: TaskList): Observable<TaskList> {
    return this.http.post<TaskList>('http://localhost:3333/lists', board)
  }

  removeTaskList(id: number):Observable<void> {
    return this.http.delete<void>(`http://localhost:3333/lists/${id}`)
  }

  renameTaskList(id: number, newName: string): Observable<TaskList> {
    return this.http.put<TaskList>(`http://localhost:3333/lists/${id}`, { name: newName})
  }
}
