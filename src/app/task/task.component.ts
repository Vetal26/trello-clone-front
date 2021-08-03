import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Task, TaskService } from '../services/task.service';
import { ShowTaskComponent } from './show-task/show-task.component';
import { CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

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

  submitted = true
  
  constructor(private taskService: TaskService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl('')
    })
  }
  
  addTask() {
    this.submitted = true
    const task: Task = {
      ...this.form.value,
      position: this.tasks.length + 1,
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
      this.updateTask(task)
    });
  }

  updateTask(task: Task){
    this.taskService.updateTask(task).subscribe(() => {})
  }

  getById(id: number) {
    return this.tasks.find((t: { id: number; }) => t.id === id)
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      this.tasks.forEach( (task: Task, index: number) => {
        const idx = index + 1
        if (task.position !== idx) {
          task.position = idx
          this.updateTask(task)
        }
      });
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);

      this.tasks.forEach( (task: Task, index: number) => {
        const idx = index + 1
        if (task.position === idx && task.taskListId === this.taskListId) {
          return
        }
        if (task.position !== idx) {
          task.position = idx
        }
        if (task.taskListId !== this.taskListId) {
          task.taskListId = this.taskListId
        }
        this.updateTask(task)
      });
    }
  }

  sortPredicate(index: number, drag: CdkDrag, drop: CdkDropList): boolean {
    if (drop.id === drag.dropContainer.id && index >= drop.data.length) return false
    if (index > drop.data.length) return false
    return true
  }
}
