import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { TasksComponent } from './tasks/tasks.component';
import { TaskItemComponent } from './task-item/task-item.component';
import { EditTaskComponent } from './edit-task/edit-task.component';
import { SearchTaskComponent } from './search-task/search-task.component';
import { RouterModule, Routes } from '@angular/router';
import { DailyTasksComponent } from './daily-tasks/daily-tasks.component';
import { SortByDatePipe } from './shared/sort-by-date.pipe';
import { MonthlyTasksComponent } from './monthly-tasks/monthly-tasks.component';
import { WeeklyTasksComponent } from './weekly-tasks/weekly-tasks.component';

const appRoutes: Routes = [
  { path: 'all_tasks', component: TasksComponent },
  { path: 'daily_tasks', component: DailyTasksComponent },
  { path: 'weekly_tasks', component: WeeklyTasksComponent },
  { path: 'monthly_tasks', component: MonthlyTasksComponent },
  { path: '', redirectTo: '/all_tasks', pathMatch: 'full' },
  { path: '**', redirectTo: '/all_tasks', pathMatch: 'full' },
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AddTaskComponent,
    TasksComponent,
    TaskItemComponent,
    EditTaskComponent,
    SearchTaskComponent,
    DailyTasksComponent,
    SortByDatePipe,
    MonthlyTasksComponent,
    WeeklyTasksComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [SortByDatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
