import { Component, Input, OnInit } from '@angular/core';
import { TaskList, TaskListService } from '../services/task-list.service';

@Component({
  selector: 'app-task-lists',
  templateUrl: './task-lists.component.html',
  styleUrls: ['./task-lists.component.scss']
})
export class TaskListsComponent implements OnInit {

  @Input()
  taskList!: TaskList;

  constructor(private taskListService: TaskListService) { }

  ngOnInit(): void {
  }

}
