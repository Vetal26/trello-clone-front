import { Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthService, User } from '../services/auth.service';
import { Board, BoardService, User_Board } from '../services/board.service';
import { TaskList } from '../services/task-list.service';
import { TaskService, Task, FindedTasks } from '../services/task.service';
import { TaskListComponent } from '../task-list/task-list.component';



@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  opened!: boolean;
  shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some(h => h.test(window.location.host));

  board!: Board;
  archiveTasks!: TaskList;
  nameUpdated = true;
  invateActive!: boolean;
  owner!: boolean | any

  findTasks!: FindedTasks | null;
  isActive = false
  @ViewChildren(TaskListComponent)
  private taskList!: QueryList<TaskListComponent>;

  archiveForm = new FormGroup({
    taskListId: new FormControl('')
  });

  constructor(private route: ActivatedRoute,
    private boardService: BoardService,
    private taskService: TaskService,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.fetchBoard(params.id);
    });
  }

  fetchBoard(id: number) {
    this.boardService.fetchBoard(id).subscribe( board => {
      this.board = board;
      console.log(this.board)
      this.getArchiveTasks()
      this.sortTaskLists()
      this.isOwner()
    })
  }

  getArchiveTasks(){
    const idx = this.board.TaskLists.findIndex(list => list.name === 'Archive')
    if (idx !== -1) {
      [this.archiveTasks] = this.board.TaskLists.splice(idx, 1)
    }
  }

  renameBoard() {
    this.boardService.renameBoard(this.board)
      .subscribe(() => {

      })
  }

  removeBoard(id: number) {
    this.boardService.removeBoard(id).subscribe( () => {
      this.router.navigate(['/boards']);
    })
  }

  onBlur() {
    this.nameUpdated = true
    this.renameBoard()
  }

  sortTaskLists() {
    this.board.TaskLists.sort( ( a: any, b: any) => {
      if (a.id < b.id) return -1;
      if (a.id > b.id) return 1;
      return 0;
    })
  }

  addTaskInArchive(task: Task) {
    task.taskListId = this.archiveTasks.id;
    const activity = { activity: 'Archived this task'}
    this.taskService.updateTask(task.id, {task, activity}).subscribe( task => {
      this.archiveTasks.Tasks.push(task);
    })
  }

  sendToBoard(task: Task) {
    task.taskListId = this.archiveForm.value.taskListId;
    const activity = { activity: 'Sent this task to the board'}
    this.taskService.restoreTask(task.id, {task, activity}).subscribe((res) => {
      const idx = this.board.TaskLists.findIndex(taskList => taskList.id === res.taskListId);
      this.board.TaskLists[idx].Tasks.push(res);
      const idxTask = this.archiveTasks.Tasks.findIndex( (task: any) => task.id === res.id)
      this.archiveTasks.Tasks.splice(idxTask, 1)
    })
  }

  onKey(target: any) { 
    if (!target.value) {
      this.findTasks = null
      this.isActive = false
      return
    }
    this.search(target.value);
    this.isActive = true
  }

  search(value: any) { 
    let filter = value.toLowerCase();
    this.taskService.search(this.board.id, filter).subscribe((tasks) => {
      console.log(tasks)
      this.findTasks = tasks
    })
  }

  onClick(id: number, listId: number) {
    this.taskList.find((cmp) => cmp.taskList.id === listId)?.showTaskDialog(id);
    this.isActive = false;
  }

  logOut(){
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  isOwner() {
    const userId = this.authService.getUserId();
    const [user] = this.board.Users.filter((user: User) => user.id === +userId);
    this.owner = user.User_Board?.owner;
  }
}
