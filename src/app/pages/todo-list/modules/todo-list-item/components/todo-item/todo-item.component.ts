import {Component, EventEmitter, Input, Output} from '@angular/core';
import {TodoListModel} from '../../../../models/todo-list.model';
import {TodoListStatusEnum} from '../../../../enums/todo-list-status.enum';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
})
export class TodoItemComponent {

  @Output() public changedStatus: EventEmitter<number> = new EventEmitter<number>();
  @Output() public itemRemove: EventEmitter<number> = new EventEmitter<number>();
  @Output() public itemEdit: EventEmitter<number> = new EventEmitter<number>();

  @Input()
  set item(value) {
    this.todoItem = value;
  }

  get item() {
    return this.todoItem;
  }

  public todoListStatus = TodoListStatusEnum;

  private todoItem: TodoListModel;


  public editItem(id: number) {
    this.itemEdit.emit(id);
  }

  public removeItem(id: number) {
    this.itemRemove.emit(id);
  }

  public changeStatus(id: number, status: number) {
    this.todoItem.status = status === TodoListStatusEnum.awaiting ?  TodoListStatusEnum.done : TodoListStatusEnum.awaiting;
    this.changedStatus.emit(id);
  }

}
