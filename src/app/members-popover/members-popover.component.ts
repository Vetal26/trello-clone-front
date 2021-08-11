import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from '../services/auth.service';
import { TaskService, Task } from '../services/task.service';

@Component({
  selector: 'app-members-popover',
  templateUrl: './members-popover.component.html',
  styleUrls: ['./members-popover.component.scss']
})
export class MembersPopoverComponent implements OnInit {

  @Input()
  members!: User[];
  @Input()
  task!: Task;
  @Output() assignUser = new EventEmitter<any>();
  isActive = false

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
  }

  toggle() {
    this.isActive = !this.isActive
  }

  isAssign(userId: any) {
    const body = {
      userId: userId,
      taskId: this.task.id
    }
    const isMember = this.task.Users.find(user => user.id === userId);

    if (isMember) {
      this.taskService.deleteAssignedUser(body).subscribe( users => {
        this.assignUser.emit(users)
      })
    } else {
      this.taskService.assignUser(body).subscribe( users => {
        this.assignUser.emit(users)
      })
    }

  }

}
