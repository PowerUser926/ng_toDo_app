import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TodoService } from '../shared/todo.service';
import { Task } from '../shared/task';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
})
export class AddTaskComponent implements OnInit {
  d = new Date();
  currentDate = this.d.toISOString().slice(0, 10);
  priority = 'Medium';
  tags: string[] = [];

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {}

  addTask(form: NgForm) {
    const task: Task = {
      id: 0,
      name: form.value.taskName,
      deadline: form.value.taskDeadline,
      priority: form.value.taskPriority,
      description: form.value.taskDescription,
      tags: this.tags,
      done: false,
    };

    this.todoService.addTask(task);
    this.resetForm(form);
  }

  addTag(tag: HTMLInputElement) {
    if (this.tags.length <= 5) {
      this.tags.push('#' + tag.value);
    }
    tag.value = '';
  }

  removeTag(removableTag: string) {
    this.tags = this.tags.filter((tag) => tag !== removableTag);
  }

  resetForm(form: NgForm) {
    form.reset({ taskDeadline: this.currentDate, taskPriority: this.priority });
    this.tags = [];
  }
}
