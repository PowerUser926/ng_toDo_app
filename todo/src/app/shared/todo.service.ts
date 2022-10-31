import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task } from 'src/app/shared/task';
import { Subject } from 'rxjs';
import { SortByDatePipe } from './sort-by-date.pipe';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  tasks: Task[] = [];
  tasksListChanged = new Subject<Task[]>();
  selectedTask = new Subject<Task>();
  selectedTaskIndex = new Subject<number>();

  constructor(private http: HttpClient, private sortPipe: SortByDatePipe) {}

  getTasks() {
    return this.http
      .get<Task[]>('http://localhost:3000/getTasks')
      .subscribe((tasks) => {
        this.tasks = tasks;
        this.tasksListChanged.next(this.sortPipe.transform(this.tasks));
      });
  }

  addTask(task: Task) {
    if (this.tasks.length !== 0) {
      task.id = this.tasks[this.tasks.length - 1].id + 1;
    }

    this.tasks.push(task);
    this.tasksListChanged.next(this.sortPipe.transform(this.tasks));
    this.selectedTask.next(this.tasks[0]);

    return this.http.post('http://localhost:3000/addTask', task).subscribe();
  }

  selectTask(i: number) {
    this.selectedTask.next(this.tasks[i]);
    this.selectedTaskIndex.next(i);
  }

  editTask(task: Task, i: number) {
    this.tasks[i].name = task.name;
    this.tasks[i].deadline = task.deadline;
    this.tasks[i].priority = task.priority;
    this.tasks[i].description = task.description;
    this.tasks[i].tags = task.tags;

    return this.http
      .put('http://localhost:3000/updateTask', { index: i, task: task })
      .subscribe();
  }

  completeTask(i: number, bool: boolean) {
    this.tasks[i].done = bool;
    this.tasksListChanged.next(this.sortPipe.transform(this.tasks));

    return this.http
      .put('http://localhost:3000/completeTask', { index: i, value: bool })
      .subscribe();
  }

  deleteTask(taskId: number) {
    this.tasks = this.tasks.filter((t) => t.id !== taskId);
    this.tasksListChanged.next(this.sortPipe.transform(this.tasks));

    return this.http
      .delete('http://localhost:3000/deleteTask', { body: { id: taskId } })
      .subscribe();
  }
}
