import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Task } from '../../services/task.service'

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
    @Inject(MAT_DIALOG_DATA) public data: Task) {}

  ngOnInit(): void {
    this.description = new FormControl(this.data.description)
  }

  onBlur() {
    this.titleUpdated = false
  }

  onSave() {
    this.updated = true
    this.data.description = this.description.value
  }

  onClose() {
    this.updated = true
    this.description.reset(this.data.description)
  }

  onCloseClick(): void {
    this.dialogRef.close();
  }

}
