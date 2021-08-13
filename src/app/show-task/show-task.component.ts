import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from '../services/auth.service';
import { Task } from '../services/task.service';

export interface DialogData {
  task: Task;
  isArchive: boolean;
  members: User[];
  isDelete: boolean
  activity: string
}

@Component({
  selector: 'app-show-task',
  templateUrl: './show-task.component.html',
  styleUrls: ['./show-task.component.scss']
})
export class ShowTaskComponent implements OnInit{

  description!: FormControl;
  title = ''
  updated = true
  titleUpdated = false

  constructor(public dialogRef: MatDialogRef<ShowTaskComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  ngOnInit(): void {
    this.description = new FormControl(this.data.task.description);
    this.title = this.data.task.title;
  }

  assignedUsers(task: any) {
    this.data.task = task;
  }
  
  archive() {
    this.data.isArchive = true;
  }

  deleteTask() {
    this.data.isDelete = true
    this.onCloseClick()
  }

  onBlur() {
    if (this.title !== this.data.task.title) {
      this.data.activity = 'Text correction'
    }
    this.titleUpdated = false
  }

  onSave() {
    this.updated = true;
    if (this.data.task.description !== this.description.value){
      this.data.activity = 'Text correction'
      this.data.task.description = this.description.value
    }
  }

  onClose() {
    this.updated = true
    this.description.reset(this.data.task.description)
  }

  onCloseClick(): void {
    this.dialogRef.close(this.data);
  }

}
