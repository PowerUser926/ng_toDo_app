import { Component, OnDestroy, OnInit } from '@angular/core';
import { Task } from '../shared/task';
import { Subscription } from 'rxjs';
import { TodoService } from '../shared/todo.service';

@Component({
  selector: 'app-monthly-tasks',
  templateUrl: './monthly-tasks.component.html',
  styleUrls: ['./monthly-tasks.component.css'],
})
export class MonthlyTasksComponent implements OnInit, OnDestroy {
  d = new Date();
  month = new Date().getMonth() + 1;
  tasks: Task[] = [];
  tasksSubs!: Subscription;

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.tasks = this.todoService.tasks.filter(
      (t) => new Date(t.deadline).getMonth() + 1 === this.month
    );
    this.tasksSubs = this.todoService.tasksListChanged.subscribe((tasks) => {
      this.tasks = tasks.filter(
        (t) => new Date(t.deadline).getMonth() + 1 === this.month
      );
    });
  }

  ngOnDestroy() {
    this.tasksSubs.unsubscribe();
  }
}
