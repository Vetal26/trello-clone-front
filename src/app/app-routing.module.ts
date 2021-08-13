import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BoardComponent } from "./board/board.component";
import { BoardsComponent } from "./boards/boards.component";
import { LogInComponent } from "./auth/log-in/log-in.component";
import { SignUpComponent } from "./auth/sign-up/sign-up.component";
import { AuthComponent } from "./auth/auth.component";
import { Oauth2Component } from "./auth/oauth2/oauth2.component";
import { InviteComponent } from "./invite/invite.component";
import { AuthGuard } from "./auth.guard";

const routes: Routes = [
    { path: '', component: AuthComponent, children: [
        { path: '', redirectTo: 'login', pathMatch: 'full'},
        { path: 'login', component: LogInComponent},
        { path: 'signup', component: SignUpComponent},
        { path: 'oauth2', component: Oauth2Component}
    ]},
    { path: 'boards', component: BoardsComponent, canActivate: [AuthGuard] },
    { path: 'boards/:id', component: BoardComponent, canActivate: [AuthGuard] },
    { path: 'invite/:key', component: InviteComponent, canActivate: [AuthGuard]},
    { path: '**', redirectTo: 'boards'}
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {

}