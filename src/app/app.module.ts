import { HttpClientModule } from '@angular/common/http';
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

import { AppComponent } from './app.component';
import { AddBoardComponent, BoardsComponent } from './boards/boards.component';
import { TaskListsComponent } from './task-lists/task-lists.component';
import { TaskComponent } from './task/task.component';
import { BoardComponent } from './board/board.component';
import { ShowTaskComponent } from './task/show-task/show-task.component';

@NgModule({
  declarations: [
    AppComponent,
    BoardsComponent,
    TaskListsComponent,
    TaskComponent,
    AddBoardComponent,
    BoardComponent,
    ShowTaskComponent,
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
  ],
  entryComponents: [
    AddBoardComponent,
    ShowTaskComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
