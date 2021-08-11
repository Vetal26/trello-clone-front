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
}

@Component({
  selector: 'app-show-task',
  templateUrl: './show-task.component.html',
  styleUrls: ['./show-task.component.scss']
})
export class ShowTaskComponent implements OnInit{

  description!: FormControl;
  updated = true
  titleUpdated = false

  constructor(public dialogRef: MatDialogRef<ShowTaskComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  ngOnInit(): void {
    this.description = new FormControl(this.data.task.description)
  }

  assignedUsers(users: any) {
    this.data.task.Users = users
  }
  
  archive() {
    this.data.isArchive = true
  }

  deleteTask() {
    this.data.isDelete = true
    this.onCloseClick()
  }

  onBlur() {
    this.titleUpdated = false
  }

  onSave() {
    this.updated = true
    this.data.task.description = this.description.value
  }

  onClose() {
    this.updated = true
    this.description.reset(this.data.task.description)
  }

  onCloseClick(): void {
    this.dialogRef.close(this.data);
  }

}
