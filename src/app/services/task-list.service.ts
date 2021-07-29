import { Injectable } from '@angular/core';
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

export class TaskListService {}
