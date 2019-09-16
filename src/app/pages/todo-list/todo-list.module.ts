import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TodoListRoutingModule } from './todo-list-routing.module';
import {TodoListItemModule} from './modules/todo-list-item/todo-list-item.module';
import {TodoListComponent} from './todo-list.component';

@NgModule({
  declarations: [TodoListComponent],
  imports: [
    CommonModule,
    TodoListRoutingModule,
    TodoListItemModule
  ]
})
export class TodoListModule { }
