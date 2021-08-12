import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSelectModule } from '@angular/material/select';
import { MatListModule } from '@angular/material/list';

import { AppComponent } from './app.component';
import { AddBoardComponent, BoardsComponent } from './boards/boards.component';
import { BoardComponent } from './board/board.component';
import { ShowTaskComponent } from './show-task/show-task.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { LogInComponent } from './auth/log-in/log-in.component';
import { AuthComponent } from './auth/auth.component';

import { AuthInterceptor } from './interceptors/auth-interceptor';
import { Oauth2Component } from './auth/oauth2/oauth2.component';
import { InviteComponent } from './invite/invite.component';
import { InvitePopoverComponent } from './invite-popover/invite-popover.component';
import { AutofocusDirective } from './autofocus.directive';
import { ClickOutsideDirective } from './click-outside.directive';
import { TaskListComponent } from './task-list/task-list.component';
import { MembersPopoverComponent } from './members-popover/members-popover.component';

@NgModule({
  declarations: [
    AppComponent,
    BoardsComponent,
    AddBoardComponent,
    BoardComponent,
    ShowTaskComponent,
    SignUpComponent,
    LogInComponent,
    AuthComponent,
    Oauth2Component,
    InviteComponent,
    InvitePopoverComponent,
    AutofocusDirective,
    ClickOutsideDirective,
    TaskListComponent,
    MembersPopoverComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatCardModule,
    MatDividerModule,
    DragDropModule,
    MatSidenavModule,
    MatSelectModule,
    MatListModule
  ],
  entryComponents: [
    AddBoardComponent,
    ShowTaskComponent
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
