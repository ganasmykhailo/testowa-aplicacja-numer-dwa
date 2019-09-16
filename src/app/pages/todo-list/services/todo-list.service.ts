import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {TodoListModel} from '../models/todo-list.model';
import {BehaviorSubject, Observable} from 'rxjs';
import {switchMap, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TodoListService {

  public bs: BehaviorSubject<TodoListModel[]> = new BehaviorSubject<TodoListModel[]>(null);
  public todoList$ = this.bs.asObservable();

  private selectedItemId: number = null;

  set selectedItem(item: number) {
    this.selectedItemId = item;
  }

  get selectedItem() {
    return this.selectedItemId;
  }

  constructor(private http: HttpClient) {
  }

  public getTodoList(): Observable<TodoListModel[]> {
    return this.http.get<TodoListModel[]>(`${environment.fakeApiUrl}/todoList`).pipe(
        tap((todoList) => {
          this.bs.next(todoList);
        }
      ),
      switchMap(() => this.todoList$)
    );
  }

  public saveTodoListItem(item) {
    return this.http.post<TodoListModel>(`${environment.fakeApiUrl}/todoList`, item).pipe(
      switchMap(() => this.getTodoList())
    );
  }

  public updateTodoListItem(id, item) {
    return this.http.put<TodoListModel[]>(`${environment.fakeApiUrl}/todoList/${id}`, item).pipe(
      switchMap(() => this.getTodoList())
    );
  }

  public removeItem(id) {
    return this.http.delete<TodoListModel>(`${environment.fakeApiUrl}/todoList/${id}`).pipe(
      switchMap(() => this.getTodoList())
    );
  }

  public resetSelectedItem() {
    this.selectedItemId = null;
  }
}
