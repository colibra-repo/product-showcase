import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TasksComponent} from '../tasks/tasks.component';
import {HistoryComponent} from '../history/history.component';
import {TrainingsComponent} from '../trainings/trainings.component';

const routes: Routes = [
  {
    path: '', redirectTo: 'tasks', pathMatch: 'full'
  },
  {
    path: 'tasks', component: TasksComponent
  },
  {
    path: 'history', component: HistoryComponent
  },
  {
    path: 'trainings', component: TrainingsComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
})
export class RoutingModule {

}
