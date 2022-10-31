import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-task',
  templateUrl: './search-task.component.html',
  styleUrls: ['./search-task.component.css'],
})
export class SearchTaskComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  searchTask(inpValue: string) {
    let filter = inpValue.toUpperCase();
    let tasks: any = document.querySelectorAll('.taskItem');
    tasks.forEach((task: any) => {
      let nameEl: any = task.querySelector('.taskName');
      let priorityEl: any = task.querySelector('.taskPriority');
      let descriptionEl: any = task.querySelector('.taskDescription');
      let tagEls: any = task.querySelectorAll('.taskTag');

      let name = nameEl.textContent || nameEl.innerText;
      let priority = priorityEl.textContent || priorityEl.innerText;
      let description = descriptionEl.textContent || descriptionEl.innerText;
      let tags: string = '';
      tagEls.forEach((el: any) => {
        tags += el.textContent || el.innerText;
      });

      if (
        name.toUpperCase().indexOf(filter) > -1 ||
        priority.toUpperCase().indexOf(filter) > -1 ||
        description.toUpperCase().indexOf(filter) > -1 ||
        tags.toUpperCase().indexOf(filter) > -1
      ) {
        task.style.display = '';
      } else {
        task.style.display = 'none';
      }
    });
  }
}
