import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Board, BoardService } from '../services/board.service';
import { InviteService } from '../services/invite.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  board!: Board;
  nameUpdated = true;
  invite: string = ''

  constructor(private route: ActivatedRoute,
    private boardService: BoardService,
    private inviteService: InviteService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.fetchBoard(params.id)
    })
  }

  fetchBoard(id: number) {
    this.boardService.fetchBoard(id).subscribe( board => {
      this.board = board;
      this.sortTaskLists()
    })
  }

  createInviteWithLink(boardId: number) {
    this.inviteService.fetchKey(boardId).subscribe( (response: any) => {
      this.invite = `http://localhost:4200/invite/${response.key}`
    })
  }

  renameBoard() {
    this.boardService.renameBoard(this.board)
      .subscribe(() => {

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
}
