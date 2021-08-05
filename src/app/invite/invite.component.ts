import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router, UrlSegment } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { BoardService } from '../services/board.service';
import { InviteService } from '../services/invite.service';

@Component({
  selector: 'app-invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.scss']
})
export class InviteComponent implements OnInit {

  key: string = '';
  boardId: any;
  url: string = '';
  email: string = ''
  boardName: string = ''

  constructor(private route: ActivatedRoute,
    private inviteService: InviteService,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    this.route.url.subscribe((url: UrlSegment[]) => {
      this.url = '/' + url.toString().replace( /,/g, '/')
    });
    this.route.params.subscribe((params: Params) => {
      this.key = params.key;
    });
    this.fetchOwnerBoard();
  }

  fetchOwnerBoard() {
    this.inviteService.fetchOwnerBoard(this.key).subscribe( res => {
      this.boardName = res.Board.name;
      this.boardId = res.boardId;
      this.email = res.User.email;
    })
  }

  joinBoard() {
    this.inviteService.joinBoard(this.key, localStorage.getItem('userId'));
    this.router.navigate(['/boards', this.boardId])
  }

  logIn() {
    this.router.navigate(['/login'], { queryParams: {returnURL: this.url}})
  }

  signUp() {
    this.router.navigate(['/signup'], { queryParams: {returnURL: this.url}})
  }

  isAuthenticated() {
    return this.authService.isAuthenticated();
  }

}