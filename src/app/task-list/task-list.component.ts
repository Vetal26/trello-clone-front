import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Task, TaskService } from '../services/task.service';
import { CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ShowTaskComponent } from '../show-task/show-task.component';
import { TaskList } from '../services/task-list.service';
import { User_Board } from '../services/board.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {

  form!: FormGroup;
  @Input()
  taskList!: TaskList;
  @Input()
  members!: User_Board[];

  // @ViewChild('textarea', { static: false })
  // set textarea(element: ElementRef<HTMLTextAreaElement>) {
  //   if(element) {
  //     element.nativeElement.focus()
  //   }
  // }

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
      position: this.taskList.Tasks.length + 1,
      taskListId: this.taskList.id
    }
    this.taskService.addTask(task)
      .subscribe( task => this.taskList.Tasks.push(task))
      this.form.reset()
  }

  onClose() {
    this.submitted = true
    this.form.reset()
  }

  showTaskDialog(id: any){
    this.taskService.fetchTask(id).subscribe(res => {
      const task: Task = res
      const dialogRef = this.dialog.open(ShowTaskComponent, {
        height: '930px',
        width: '768px',
        data: {
          task: task, 
          members: this.members}
      })
  
      dialogRef.afterClosed().subscribe((result) => {
        this.updateTask(result.task)
      });
    }) 
  }

  updateTask(task: Task){
    this.taskService.updateTask(task).subscribe(() => {})
  }

  getById(id: number) {
    return this.taskList.Tasks.find((t: { id: number; }) => t.id === id)
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      this.taskList.Tasks.forEach( (task: Task, index: number) => {
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

      this.taskList.Tasks.forEach( (task: Task, index: number) => {
        const idx = index + 1
        if (task.position === idx && task.taskListId === this.taskList.id) {
          return
        }
        if (task.position !== idx) {
          task.position = idx
        }
        if (task.taskListId !== this.taskList.id) {
          task.taskListId = this.taskList.id
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
