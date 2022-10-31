import { Component, OnDestroy, OnInit } from '@angular/core';
import { Task } from '../shared/task';
import { Subscription } from 'rxjs';
import { TodoService } from '../shared/todo.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent implements OnInit, OnDestroy {
  tasks: Task[] = [];
  tasksSubs!: Subscription;

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.tasks = this.todoService.tasks;
    this.tasksSubs = this.todoService.tasksListChanged.subscribe((tasks) => {
      this.tasks = tasks;
    });
  }

  ngOnDestroy() {
    this.tasksSubs.unsubscribe();
  }
}
