import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Board, BoardService } from '../services/board.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  board!: Board

  constructor(private route: ActivatedRoute, private boardService: BoardService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.fetchBoard(params.id)
    })
  }

  fetchBoard(id: number) {
    this.boardService.fetchBoard(id).subscribe( board => this.board = board)
  }

}
