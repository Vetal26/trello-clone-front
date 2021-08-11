import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Task, TaskService } from '../services/task.service';
import { CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ShowTaskComponent } from '../show-task/show-task.component';
import { TaskList } from '../services/task-list.service';
import { User } from '../services/auth.service';


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
  members!: User[];
  @Output() archiveTask = new EventEmitter<any>()

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
    });
    this.sortTasks()
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
    // this.taskService.fetchTask(id).subscribe(res => {
    //   const task: Task = res
    // }) 
    const task: Task = this.getById(id)
    const dialogRef = this.dialog.open(ShowTaskComponent, {
      height: '930px',
      width: '768px',
      data: {
        task: task, 
        members: this.members,
        isArchive: false,
        isDelete: false
      }
    })

    dialogRef.afterClosed().subscribe((data) => {
      console.log(data)
      if (!data.isArchive){
        this.updateTask(data.task)
      } else {
        const index = this.taskList.Tasks.findIndex((t: Task) => t.id === data.task.id)
        if (index !== -1){
          this.taskList.Tasks.splice(index, 1)
          this.archiveTask.emit(data.task)
        }
      }

      if (data.isDelete) {
        this.deleteTasks([data.task.id]).subscribe(() => {
          const idx = this.taskList.Tasks.findIndex( (task: any) => task.id === data.task.id);
          this.taskList.Tasks.splice(idx, 1);
        })
      }
    });
  }

  clearTaskList() {
    let ids: any[] = []
    this.taskList.Tasks.forEach((task: Task) => {
      return ids.push(task.id);
    });
    this.deleteTasks(ids).subscribe(() => {
      this.taskList.Tasks = []
    })
  }

  deleteTasks(ids: number[]) {
    return this.taskService.removeTask(ids);
  }

  updateTask(task: Task){
    this.taskService.updateTask(task).subscribe((res) => {
      const idx = this.taskList.Tasks.findIndex((t: Task) => t.id === task.id);
      this.taskList.Tasks[idx] = res
    })
  }

  

  sortTasks() {
    this.taskList.Tasks.sort( ( a: any, b: any) => {
      if (a.position < b.position) return -1;
      if (a.position > b.position) return 1;
      return 0;
    })
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
    this.sortTasks()
  }

  sortPredicate(index: number, drag: CdkDrag, drop: CdkDropList): boolean {
    if (drop.id === drag.dropContainer.id && index >= drop.data.length) return false
    if (index > drop.data.length) return false
    return true
  }

}
