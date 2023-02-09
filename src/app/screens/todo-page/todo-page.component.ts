import { Todo } from './../../models/todo.model';
import { TodoLocalDataSource } from './../../data/todo-data-source.service';
import { Component } from '@angular/core';

@Component({
  templateUrl: './todo-page.component.html',
  styleUrls: ['./todo-page.component.scss'],
})
export class TodoPageComponent {
  constructor(public todoService: TodoLocalDataSource) {}

  todos$ = this.todoService.getTodoItems();

  createTodo() {
    this.todoService.addTodoItem({
      id: Math.floor(Math.random() * 1000),
      title: 'New Todo',
      description: 'New Todo Description',
      completed: false,
    });
  }

  deleteTodo(id: number) {
    this.todoService.deleteTodoItem(id);
  }

  updateTodo(todo: Todo) {
    this.todoService.updateTodoItem(todo);
  }
}
