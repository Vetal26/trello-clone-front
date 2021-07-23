import { Component, OnInit } from '@angular/core';
import { TaskListService } from '../services/task-list.service';

@Component({
  selector: 'app-task-lists',
  templateUrl: './task-lists.component.html',
  styleUrls: ['./task-lists.component.scss']
})
export class TaskListsComponent implements OnInit {

  constructor(private taskListService: TaskListService) { }

  ngOnInit(): void {
  }

}
