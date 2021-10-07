import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoardComponent } from './board/board.component';
import { BoardsComponent } from './boards/boards.component';
import { LogInComponent } from './auth/log-in/log-in.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { AuthComponent } from './auth/auth.component';
import { Oauth2Component } from './auth/oauth2/oauth2.component';
import { InviteComponent } from './invite/invite.component';
import { AuthGuard } from './guards/auth.guard';
import { AuthRoutesGuard } from './guards/auth-routes.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: '',
    component: AuthComponent,
    canActivate: [AuthRoutesGuard],
    children: [
      {
        path: 'login',
        component: LogInComponent,
        canActivateChild: [AuthRoutesGuard],
      },
      {
        path: 'signup',
        component: SignUpComponent,
        canActivateChild: [AuthRoutesGuard],
      },
      {
        path: 'oauth2',
        component: Oauth2Component,
        canActivateChild: [AuthRoutesGuard],
      },
    ],
  },
  { path: 'boards', component: BoardsComponent, canActivate: [AuthGuard] },
  { path: 'boards/:id', component: BoardComponent, canActivate: [AuthGuard] },
  { path: 'invite/:key', component: InviteComponent },
  { path: '**', redirectTo: 'boards', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
