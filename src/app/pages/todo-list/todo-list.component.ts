import {Component, OnDestroy, OnInit} from '@angular/core';
import {TodoListService} from './services/todo-list.service';
import {TodoListModel} from './models/todo-list.model';
import {first} from 'rxjs/operators';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit, OnDestroy {

  public todoList: TodoListModel[];

  private subscription: Subscription = new Subscription();

  constructor(private todoListService: TodoListService,
              private router: Router) { }

  public ngOnInit() {
    this.getTodoList();
  }

  public changeStatus(id: number) {
    if (id) {
      const todoItem: TodoListModel = this.findTodoItemById(this.todoList, id);
      this.todoListService.updateTodoListItem(id, todoItem).pipe(
        first()
      ).subscribe();
    }
  }

  public editItem(id: number) {
    this.todoListService.selectedItem = id;
    this.router.navigate(['settings']).then();
  }

  public ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private getTodoList() {
    const getTodoListSub = this.todoListService.getTodoList().subscribe(
      (todoList) => this.todoList = todoList
    );

    this.subscription.add(getTodoListSub);
  }

  private findTodoItemById(list: TodoListModel[], itemId: number) {
    return list.find((item) => item.id === itemId);
  }
}
