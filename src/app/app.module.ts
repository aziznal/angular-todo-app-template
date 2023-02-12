import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodoPageComponent } from './screens/todo-page/todo-page.component';
import { TodoItemComponent } from './components/todo-item/todo-item.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DisabledDirective } from './directives/disabled-overlay.directive';

@NgModule({
  declarations: [AppComponent, TodoPageComponent, TodoItemComponent, DisabledDirective],
  imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule, FormsModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
