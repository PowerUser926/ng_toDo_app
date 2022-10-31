import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Task } from '../shared/task';
import { TodoService } from '../shared/todo.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css'],
})
export class EditTaskComponent implements OnInit, OnDestroy {
  index!: number;
  indexSubs!: Subscription;
  tags: string[] = [];
  task: Task = {
    id: 0,
    name: '',
    deadline: '',
    priority: '',
    description: '',
    tags: [],
    done: false,
  };
  taskSubs!: Subscription;

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.indexSubs = this.todoService.selectedTaskIndex.subscribe((i) => {
      this.index = i;
    });
    this.taskSubs = this.todoService.selectedTask.subscribe((task) => {
      this.task = task;
      this.tags = task.tags.slice();
    });
  }

  ngOnDestroy() {
    this.indexSubs.unsubscribe();
    this.taskSubs.unsubscribe();
  }

  editTask(form: NgForm) {
    const task: Task = {
      id: 0,
      name: form.value.editTaskName,
      deadline: form.value.editTaskDeadline,
      priority: form.value.editTaskPriority,
      description: form.value.editTaskDescription,
      tags: this.tags.slice(),
      done: false,
    };

    this.todoService.editTask(task, this.index);
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
    form.reset({
      editTaskName: this.task.name,
      editTaskDeadline: this.task.deadline,
      editTaskPriority: this.task.priority,
      editTaskDescription: this.task.description,
    });
  }
}
