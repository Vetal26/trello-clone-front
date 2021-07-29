import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BoardComponent } from "./board/board.component";
import { BoardsComponent } from "./boards/boards.component";
import { LogInComponent } from "./auth/log-in/log-in.component";
import { SignUpComponent } from "./auth/sign-up/sign-up.component";
import { AuthComponent } from "./auth/auth.component";

const routes: Routes = [
    { path: '', component: AuthComponent, children: [
        { path: '', redirectTo: 'login', pathMatch: 'full'},
        { path: 'login', component: LogInComponent},
        { path: 'signup', component: SignUpComponent},
    ]},
    { path: 'boards', component: BoardsComponent },
    { path: 'boards/:id', component: BoardComponent }
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {

}