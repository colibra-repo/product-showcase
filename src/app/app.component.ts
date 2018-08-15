import {Component} from '@angular/core';
import {MatIconRegistry} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private matIconRegistry: MatIconRegistry, private sanitizer: DomSanitizer) {
    this.matIconRegistry.addSvgIcon('logo', this.sanitizer.bypassSecurityTrustResourceUrl('/assets/colibra_logo.svg'));
    this.matIconRegistry.addSvgIcon('logo_footer', this.sanitizer.bypassSecurityTrustResourceUrl('/assets/colibra_logo_footer.svg'));
    this.matIconRegistry.addSvgIcon('account', this.sanitizer.bypassSecurityTrustResourceUrl('/assets/ic_account.svg'));
    this.matIconRegistry.addSvgIcon('history', this.sanitizer.bypassSecurityTrustResourceUrl('/assets/ic_history.svg'));
    this.matIconRegistry.addSvgIcon('close', this.sanitizer.bypassSecurityTrustResourceUrl('/assets/ic_small_close.svg'));
    this.matIconRegistry.addSvgIcon('info', this.sanitizer.bypassSecurityTrustResourceUrl('/assets/ic_small_info.svg'));
    this.matIconRegistry.addSvgIcon('more', this.sanitizer.bypassSecurityTrustResourceUrl('/assets/ic_small_more.svg'));
    this.matIconRegistry.addSvgIcon('notifications', this.sanitizer.bypassSecurityTrustResourceUrl('/assets/ic_small_notifications.svg'));
    this.matIconRegistry.addSvgIcon('notifications_active', this.sanitizer.bypassSecurityTrustResourceUrl('/assets/ic_small_notification_active.svg'));
    this.matIconRegistry.addSvgIcon('star', this.sanitizer.bypassSecurityTrustResourceUrl('/assets/ic_small_star.svg'));
    this.matIconRegistry.addSvgIcon('star_empty', this.sanitizer.bypassSecurityTrustResourceUrl('/assets/ic_small_star_empty.svg'));
    this.matIconRegistry.addSvgIcon('verified', this.sanitizer.bypassSecurityTrustResourceUrl('/assets/ic_small_verified.svg'));
    this.matIconRegistry.addSvgIcon('task_flight', this.sanitizer.bypassSecurityTrustResourceUrl('/assets/ic_task_flight.svg'));
    this.matIconRegistry.addSvgIcon('task_health', this.sanitizer.bypassSecurityTrustResourceUrl('/assets/ic_task_health.svg'));
    this.matIconRegistry.addSvgIcon('task_luggage', this.sanitizer.bypassSecurityTrustResourceUrl('/assets/ic_task_luggage.svg'));
    this.matIconRegistry.addSvgIcon('task_colibra', this.sanitizer.bypassSecurityTrustResourceUrl('/assets/colibra_small_logo.svg'));
    this.matIconRegistry.addSvgIcon('tasks', this.sanitizer.bypassSecurityTrustResourceUrl('/assets/ic_tasks.svg'));
    this.matIconRegistry.addSvgIcon('trainings', this.sanitizer.bypassSecurityTrustResourceUrl('/assets/ic_trainings.svg'));
  }

}
