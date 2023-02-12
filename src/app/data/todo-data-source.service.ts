import { Todo } from './../models/todo.model';
import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, delay, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoLocalDataSource implements OnDestroy {
  // mocked storage for todo items
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

  // whether an async operation is in progress
  loading$ = new BehaviorSubject(false);

  getTodoItems(): Observable<Todo[]> {
    // returns todo items with a pipe that sets loading to false
    this.loading$.next(true);

    return this.#todoItems$.pipe(delay(500), () => {
      this.loading$.next(false);
      return of(this.#todoItems);
    });
  }

  async addTodoItem(todoItem: Todo): Promise<void> {
    this.loading$.next(true);

    await this.#sleep(500);

    this.#todoItems.push(todoItem);

    this.#todoItems$.next(this.#todoItems);

    this.loading$.next(false);
  }

  async updateTodoItem(todoItem: Todo): Promise<void> {
    this.loading$.next(true);

    await this.#sleep(500);

    const index = this.#todoItems.findIndex(item => item.id === todoItem.id);

    if (index > -1) {
      this.#todoItems[index] = todoItem;
    }

    this.#todoItems$.next(this.#todoItems);

    this.loading$.next(false);
  }

  async deleteTodoItem(id: number): Promise<void> {
    this.loading$.next(true);

    await this.#sleep(500);

    const index = this.#todoItems.findIndex(item => item.id === id);

    if (index > -1) {
      this.#todoItems.splice(index, 1);
    }

    this.#todoItems$.next(this.#todoItems);

    this.loading$.next(false);
  }

  // helper to simulate latency
  #sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  ngOnDestroy(): void {
    this.#todoItems$.complete();
    this.loading$.complete();
  }
}
