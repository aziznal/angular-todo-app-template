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

  isLoading = false;

  async createTodo() {
    this.isLoading = true;

    await this.todoService.addTodoItem({
      id: Math.floor(Math.random() * 1000),
      title: 'New Todo',
      description: 'New Todo Description',
      completed: false,
    });

    this.isLoading = false;
  }

  async deleteTodo(id: number) {
    this.isLoading = true;

    await this.todoService.deleteTodoItem(id);

    this.isLoading = false;
  }

  async updateTodo(todo: Todo) {
    this.isLoading = true;

    await this.todoService.updateTodoItem(todo);

    this.isLoading = false;
  }
}
