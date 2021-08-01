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

import { AppComponent } from './app.component';
import { AddBoardComponent, BoardsComponent } from './boards/boards.component';
import { TaskListsComponent } from './task-lists/task-lists.component';
import { TaskComponent } from './task/task.component';
import { BoardComponent } from './board/board.component';
import { ShowTaskComponent } from './task/show-task/show-task.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { LogInComponent } from './auth/log-in/log-in.component';
import { AuthComponent } from './auth/auth.component';

import { AuthInterceptor } from './interceptors/auth-interceptor';
import { Oauth2Component } from './auth/oauth2/oauth2.component';

@NgModule({
  declarations: [
    AppComponent,
    BoardsComponent,
    TaskListsComponent,
    TaskComponent,
    AddBoardComponent,
    BoardComponent,
    ShowTaskComponent,
    SignUpComponent,
    LogInComponent,
    AuthComponent,
    Oauth2Component,
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
    DragDropModule
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
