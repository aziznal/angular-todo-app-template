import { Todo } from './../../models/todo.model';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
})
export class TodoItemComponent implements OnInit {
  @Input()
  todo!: Todo;

  @Output()
  completed = new EventEmitter<boolean>();

  @Output()
  updated = new EventEmitter<Todo>();

  @Output()
  deleted = new EventEmitter<Todo>();

  ngOnInit(): void {
    if (!this.todo) {
      throw new Error('Todo is not defined');
    }
  }

  complete(): void {
    this.update({ ...this.todo, completed: true });
  }

  uncomplete(): void {
    this.update({ ...this.todo, completed: false });
  }

  setCompletion(newState: boolean): void {
    if (newState) {
      this.complete();
    } else {
      this.uncomplete();
    }
  }

  update(updatedTodo: Todo): void {
    this.updated.emit(updatedTodo);
  }

  delete(): void {
    this.deleted.emit(this.todo);
  }
}
