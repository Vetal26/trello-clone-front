import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Task, TaskService } from '../services/task.service';
import { ShowTaskComponent } from './show-task/show-task.component';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
  
  form!: FormGroup;

  @Input() tasks: Task[] | any = [];
  @Input()
  taskListId: any;
  // task!: Task;

  submitted = true
  
  constructor(private taskService: TaskService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl('')
    })
  }
  
  addTask() {
    this.submitted = true
    console.log(this.form.value)
    const task: Task = {
      ...this.form.value,
      taskListId: this.taskListId
    }
    this.taskService.addTask(task)
      .subscribe( task => this.tasks.push(task))
      this.form.reset()
  }

  onClose() {
    this.submitted = true
    this.form.reset()
  }

  showTaskDialog(id: number){
    const task = this.getById(id)
    const dialogRef = this.dialog.open(ShowTaskComponent, {
      height: '930px',
      width: '768px',
      data: task
    })

    dialogRef.afterClosed().subscribe((result) => {
      this.updateTask(  task)
    });
  }

  updateTask(task: Task){
    this.taskService.updateTask(task).subscribe(() => {})
  }

  getById(id: number) {
    return this.tasks.find((t: { id: number; }) => t.id === id)
  }
}
