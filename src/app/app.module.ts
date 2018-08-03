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

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DesktopMenuComponent,
    TasksComponent,
    HistoryComponent,
    TrainingsComponent,
    MobileMenuComponent,
    ProfileMenuComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    RoutingModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
