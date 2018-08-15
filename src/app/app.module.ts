import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FlexLayoutModule} from '@angular/flex-layout';
import {RoutingModule} from './routing/routing.module';
import {MaterialModule} from './material/material.module';
import {HeaderComponent} from './header/header.component';
import {DesktopMenuComponent} from './menu/desktop-menu/desktop-menu.component';
import {TasksComponent} from './tasks/tasks.component';
import {HistoryComponent} from './history/history.component';
import {TrainingsComponent} from './trainings/trainings.component';
import {MobileMenuComponent} from './menu/mobile-menu/mobile-menu.component';
import {ProfileMenuComponent} from './profile-menu/profile-menu.component';
import {TaskCardComponent} from './tasks/task-card/task-card.component';
import {TrainingCardComponent} from './trainings/training-card/training-card.component';
import {HistoryTaskCardComponent} from './tasks/history-task-card/history-task-card.component';
import {NearbyHospitalsDialogComponent, TaskDetailsComponent, UserVideoDialogComponent} from './tasks/task-details/task-details.component';
import {MediaPlayerModule} from './media-player/media-player.module';
import {AgmCoreModule} from '@agm/core';
import {environment} from '../environments/environment';
import {RatingComponent} from './rating/rating.component';
import {ScoreComponent} from './score/score.component';
import {BlurrableDirective} from './blurrable.directive';
import {HttpClientModule} from '@angular/common/http';


Number.prototype.toTimestampString = function () {
  const sec_num = this; // don't forget the second param
  const hours = Math.floor(sec_num / 3600);
  const minutes = Math.floor((sec_num - (hours * 3600)) / 60);
  const seconds = sec_num - (hours * 3600) - (minutes * 60);

  let result = '';

  if (hours > 0) {
    result += hours + ' h ';
  }

  result += minutes + ' min ';
  result += seconds + ' sec';

  return result;
};

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DesktopMenuComponent,
    TasksComponent,
    HistoryComponent,
    TrainingsComponent,
    MobileMenuComponent,
    ProfileMenuComponent,
    TaskCardComponent,
    TrainingCardComponent,
    HistoryTaskCardComponent,
    TrainingCardComponent,
    TaskDetailsComponent,
    UserVideoDialogComponent,
    NearbyHospitalsDialogComponent,
    RatingComponent,
    ScoreComponent,
    BlurrableDirective
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    RoutingModule,
    MaterialModule,
    MediaPlayerModule,
    AgmCoreModule.forRoot({
      apiKey: environment.apiKey
    }),
    HttpClientModule
  ],
  providers: [],
  entryComponents: [
    UserVideoDialogComponent,
    NearbyHospitalsDialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
