import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Board, BoardService, User_Board } from '../services/board.service';
import { TaskList } from '../services/task-list.service';
import { TaskService, Task } from '../services/task.service';
import { ShowTaskComponent } from '../show-task/show-task.component';

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

  form = new FormGroup({
    taskListId: new FormControl('')
  });

  constructor(private route: ActivatedRoute,
    private boardService: BoardService,
    private taskService: TaskService,
    private router: Router,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.fetchBoard(params.id)
    });
  }

  fetchBoard(id: number) {
    this.boardService.fetchBoard(id).subscribe( board => {
      this.board = board;
      console.log(this.board)
      this.getArciveTasks()
      this.sortTaskLists()
    })
  }

  getArciveTasks(){
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
    task.taskListId = this.archiveTasks.id
    this.taskService.updateTask(task).subscribe( task => {
      this.archiveTasks.Tasks.push(task)
    })
  }

  sendToBoard(task: Task) {
    task.taskListId = this.form.value.taskListId
    this.taskService.restoreTask(task).subscribe((res) => {
      const idx = this.board.TaskLists.findIndex(taskList => taskList.id === res.taskListId);
      this.board.TaskLists[idx].Tasks.push(res);
      const idxTask = this.archiveTasks.Tasks.findIndex( (task: any) => task.id === res.id)
      this.archiveTasks.Tasks.splice(idxTask, 1)
    })
  }
}
