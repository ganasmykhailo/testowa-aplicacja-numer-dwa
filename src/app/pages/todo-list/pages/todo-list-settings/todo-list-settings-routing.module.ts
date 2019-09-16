import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TodoListSettingsComponent} from './todo-list-settings.component';

const routes: Routes = [
  {
    path: '',
    component: TodoListSettingsComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TodoListSettingsRoutingModule { }
