import { Component, OnDestroy, OnInit } from '@angular/core';
import { TodoService } from './shared/todo.service';
import { Task } from './shared/task';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [TodoService],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'todo';
  tasks: Task[] = [];
  tasksSubs!: Subscription;

  constructor(private todoService: TodoService) {}

  ngOnInit() {
    this.todoService.getTasks();
    this.tasksSubs = this.todoService.tasksListChanged.subscribe((tasks) => {
      this.tasks = tasks;
    });
  }

  ngOnDestroy() {
    this.tasksSubs.unsubscribe();
  }

  getTasks() {
    this.todoService.getTasks();
  }
}
