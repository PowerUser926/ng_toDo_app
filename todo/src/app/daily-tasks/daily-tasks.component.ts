import { Component, OnDestroy, OnInit } from '@angular/core';
import { Task } from '../shared/task';
import { Subscription } from 'rxjs';
import { TodoService } from '../shared/todo.service';

@Component({
  selector: 'app-daily-tasks',
  templateUrl: './daily-tasks.component.html',
  styleUrls: ['./daily-tasks.component.css'],
})
export class DailyTasksComponent implements OnInit, OnDestroy {
  day = new Date().getDate();
  tasks: Task[] = [];
  tasksSubs!: Subscription;

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.tasks = this.todoService.tasks.filter(
      (t) => new Date(t.deadline).getDate() === this.day
    );
    this.tasksSubs = this.todoService.tasksListChanged.subscribe((tasks) => {
      this.tasks = tasks.filter(
        (t) => new Date(t.deadline).getDate() === this.day
      );
    });
  }

  ngOnDestroy() {
    this.tasksSubs.unsubscribe();
  }
}
