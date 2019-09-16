import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {TodoListService} from '../../services/todo-list.service';
import {TodoListModel} from '../../models/todo-list.model';
import {first} from 'rxjs/operators';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-todo-list-settings',
  templateUrl: './todo-list-settings.component.html',
  styleUrls: ['./todo-list-settings.component.scss'],
})
export class TodoListSettingsComponent implements OnInit, OnDestroy {

  public todoList: TodoListModel[];

  public editTodoItem: TodoListModel;

  private subscription: Subscription = new Subscription();

  constructor(private fb: FormBuilder,
              private todoListService: TodoListService) { }

  public ngOnInit() {
    this.getToDoList();
  }

  public statusChange(id: number) {
    if (id) {
      const todoItem: TodoListModel = this.findTodoItemById(this.todoList, id);
      this.todoListService.updateTodoListItem(id, todoItem).pipe(
        first()
      ).subscribe();
    }
  }

  public editItem(id: number = null) {

    const selectedItemId = this.todoListService.selectedItem ? this.todoListService.selectedItem : id;

    if (selectedItemId) {
      this.editTodoItem = this.findTodoItemById(this.todoList, selectedItemId);
      this.todoListService.resetSelectedItem();
    }
  }

  public removeItem(id: number) {
    if (id) {
      this.todoListService.removeItem(id).pipe(
        first()
      ).subscribe();
    }
  }

  public ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private findTodoItemById(list: TodoListModel[], itemId: number) {
    return list.find((item) => item.id === itemId);
  }

  private getToDoList() {
    const getTodoListSub = this.todoListService.getTodoList().subscribe((data) => {
      this.todoList = data;

      this.editItem();
    });

    this.subscription.add(getTodoListSub);
  }
}
