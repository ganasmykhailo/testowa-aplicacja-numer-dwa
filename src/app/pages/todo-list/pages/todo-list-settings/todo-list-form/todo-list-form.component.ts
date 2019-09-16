import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {first} from 'rxjs/operators';
import {TodoListService} from '../../../services/todo-list.service';
import {TodoListStatusEnum} from '../../../enums/todo-list-status.enum';
import {TodoListModel} from '../../../models/todo-list.model';

@Component({
  selector: 'app-todo-list-form',
  templateUrl: './todo-list-form.component.html',
  styleUrls: ['./todo-list-form.component.scss']
})
export class TodoListFormComponent implements OnInit {

  @Input()
  set todoItem(item: TodoListModel) {
    if (item) {
      this.form.patchValue(item);
    }
  }

  public form: FormGroup;

  public todoListStatus = TodoListStatusEnum;

  constructor(private fb: FormBuilder,
              private todoListService: TodoListService) {
  }

  public ngOnInit() {
    this.initForm();
  }

  public initForm() {
    this.form = this.fb.group({
      id: [null],
      title: [null, Validators.required],
      description: [null, Validators.required],
      date: [null, Validators.required],
      status: [this.todoListStatus.awaiting]
    });
  }

  public saveItem() {
    const itemId = this.form.get('id').value;
    if (itemId) {
      this.todoListService.updateTodoListItem(itemId, this.form.value).pipe(
        first()
      ).subscribe(() => {
          this.initForm();
        }
      );
    } else {
      this.todoListService.saveTodoListItem(this.form.value).pipe(
        first()
      ).subscribe(() => {
          this.initForm();
        }
      );
    }
  }

}
