import { Component, OnDestroy, OnInit } from '@angular/core';
import { Task } from '../shared/task';
import { Subscription } from 'rxjs';
import { TodoService } from '../shared/todo.service';

@Component({
  selector: 'app-weekly-tasks',
  templateUrl: './weekly-tasks.component.html',
  styleUrls: ['./weekly-tasks.component.css'],
})
export class WeeklyTasksComponent implements OnInit, OnDestroy {
  startD = new Date().getDate();
  endD = new Date().getDate();
  tasks: Task[] = [];
  tasksSubs!: Subscription;

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.getDateRange();

    this.tasks = this.todoService.tasks.filter(
      (t) =>
        new Date(t.deadline).getDate() >= this.startD &&
        new Date(t.deadline).getDate() <= this.endD
    );
    this.tasksSubs = this.todoService.tasksListChanged.subscribe((tasks) => {
      this.tasks = tasks.filter(
        (t) =>
          new Date(t.deadline).getDate() >= this.startD &&
          new Date(t.deadline).getDate() <= this.endD
      );
    });
  }

  ngOnDestroy() {
    this.tasksSubs.unsubscribe();
  }

  getDateRange() {
    let m = new Date().getMonth();
    let d = new Date().getDate();
    let weekDay = new Date().getDay();
    let dayInMonth!: number;

    if ([1, 3, 5, 7, 8, 10, 12].includes(m)) {
      dayInMonth = 31;
    } else if ([4, 6, 9, 11].includes(m)) {
      dayInMonth = 30;
    } else {
      dayInMonth = 28;
    }

    if (weekDay === 0) {
      weekDay = 7;
    }

    if (d > 7) {
      this.startD -= 1;
      this.endD += 6 - weekDay;
    } else if (d + 6 > dayInMonth) {
      this.startD = d;
      this.endD = dayInMonth;
    } else {
      this.startD = 1;
      this.endD = 7;
    }
  }
}
