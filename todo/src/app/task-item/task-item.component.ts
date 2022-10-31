import { Component, Input, OnInit } from '@angular/core';
import { Task } from '../shared/task';
import { TodoService } from '../shared/todo.service';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css'],
})
export class TaskItemComponent implements OnInit {
  @Input() task!: Task;
  @Input() index!: number;

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {}

  completeTask(checkbox: any) {
    this.todoService.completeTask(this.index, checkbox.checked);
  }

  selectTask() {
    this.todoService.selectTask(this.index);
  }

  deleteTask() {
    this.todoService.deleteTask(this.task.id);
  }
}
