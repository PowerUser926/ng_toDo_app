import { Pipe, PipeTransform } from '@angular/core';
import { Task } from '../shared/task';

@Pipe({
  name: 'sortByDate',
})
export class SortByDatePipe implements PipeTransform {
  transform(tasks: Task[]): any[] {
    return tasks.sort((a, b) => {
      let x;
      let y;
      x = <any>new Date(b['deadline']);
      y = <any>new Date(a['deadline']);

      if (x > y) {
        return -1;
      } else if (x < y) {
        return 1;
      }
      return 0;
    });
  }
}
