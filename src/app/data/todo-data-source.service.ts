import { Todo } from './../models/todo.model';
import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, delay, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoLocalDataSource implements OnDestroy {
  #todoItems: Todo[] = [
    {
      id: 1,
      title: 'Learn Angular',
      description: 'Learn the basics of Angular',
      completed: true,
    },
    {
      id: 2,
      title: 'Learn RxJS',
      description: 'Learn the basics of RxJS',
      completed: false,
    },
    {
      id: 3,
      title: 'Learn NgRx',
      description: 'Learn the basics of NgRx',
      completed: false,
    },
  ];

  #todoItems$: BehaviorSubject<Todo[]> = new BehaviorSubject(this.#todoItems);

  getTodoItems(): Observable<Todo[]> {
    return this.#todoItems$.pipe(delay(500));
  }

  async addTodoItem(todoItem: Todo): Promise<void> {
    await this.#sleep(500);

    this.#todoItems.push(todoItem);

    this.#todoItems$.next(this.#todoItems);
  }

  async updateTodoItem(todoItem: Todo): Promise<void> {
    await this.#sleep(500);

    const index = this.#todoItems.findIndex(item => item.id === todoItem.id);

    if (index > -1) {
      this.#todoItems[index] = todoItem;
    }

    this.#todoItems$.next(this.#todoItems);
  }

  async deleteTodoItem(id: number): Promise<void> {
    await this.#sleep(500);

    const index = this.#todoItems.findIndex(item => item.id === id);

    if (index > -1) {
      this.#todoItems.splice(index, 1);
    }

    this.#todoItems$.next(this.#todoItems);
  }

  // helper to simulate latency
  #sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  ngOnDestroy(): void {
    this.#todoItems$.complete();
  }
}
