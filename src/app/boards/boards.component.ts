import { Component, Inject, OnInit } from '@angular/core';
import { Board, BoardService } from '../services/board.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

export interface DialogData {
  name: string
}

@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.scss']
})
export class BoardsComponent implements OnInit {

  boards: Board[] = [];
  boardName = '';

  constructor(private boardService: BoardService,
    private dialog: MatDialog,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
    this.fetchBoards()
  }

  fetchBoards() {
    const user = { userId: this.boardService.getUserId()}
    this.boardService.fetchBoards(this.boardService.getUserId()).subscribe( boards => this.boards = boards)
  }

  addBoardDialog() {
    const dialogRef = this.dialog.open(AddBoardComponent, {
      height: '162px',
      width: '249px',
      data: { name: this.boardName }
    })

    dialogRef.afterClosed().subscribe(result => {
      this.boardName = result;
      this.addBoard()
    });
  }

  addBoard() {
    if(!this.boardName.trim()) {
      return
    }

    this.boardService.addBoard({ name: this.boardName, userId: this.boardService.getUserId() })
      .subscribe( board => {
        this.boards.push(board)
      })
  }

  removeBoard(id: number) {
    this.boardService.removeBoard(id)
      .subscribe(() => {
        this.boards = this.boards.filter(b => b.id != id)
      })
  }

  logOut(){
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}

@Component({
  selector: 'app-add-board',
  templateUrl: './add-board.component.html',
})

export class AddBoardComponent {

  constructor(public dialogRef: MatDialogRef<AddBoardComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onCloseClick(): void {
    this.dialogRef.close();
  }
}