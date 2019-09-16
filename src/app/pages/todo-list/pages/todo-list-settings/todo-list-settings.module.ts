import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TodoListSettingsRoutingModule } from './todo-list-settings-routing.module';
import { TodoListSettingsComponent } from './todo-list-settings.component';
import {ReactiveFormsModule} from '@angular/forms';
import {TodoListItemModule} from '../../modules/todo-list-item/todo-list-item.module';
import { TodoListFormComponent } from './todo-list-form/todo-list-form.component';

@NgModule({
  declarations: [TodoListSettingsComponent, TodoListFormComponent],
  imports: [
    CommonModule,
    TodoListSettingsRoutingModule,
    ReactiveFormsModule,
    TodoListItemModule,
  ]
})
export class TodoListSettingsModule { }
