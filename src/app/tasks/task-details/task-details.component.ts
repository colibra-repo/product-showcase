import {ChangeDetectionStrategy, Component, ElementRef, Inject, OnInit, Renderer2, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';
import {VgAPI} from 'videogular2/core';
import {fromEvent} from 'rxjs';
import {DbService} from '../../services/db.service';
import {ActivatedRoute, Router} from '@angular/router';

declare var VTTCue;

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.scss']
})
export class TaskDetailsComponent implements OnInit {
  @ViewChild('taskTypeIcon') taskTypeIcon: ElementRef;


  task: any;
  iconClass: string;
  hasVoted = false;

  constructor(private _route: ActivatedRoute, private _router: Router, private _renderer: Renderer2, private db: DbService,
              public dialog: MatDialog) {
    const taskId = this._route.snapshot.params['id'];
    this.task = db.tasksMap[taskId];
    switch (this.task['insurance_type']) {
      case 'Medical': {
        this.iconClass = 'fa-user-md';
        break;
      }
      default: {
        this.iconClass = 'fa-user-secret';
        break;
      }
    }
    this.task['vote'] = false;
    this.hasVoted = db.hasUserVote(taskId);
  }

  ngOnInit() {
    this._renderer.addClass(this.taskTypeIcon.nativeElement, this.iconClass);
  }

  openVideo() {
    const dialogRef = this.dialog.open(UserVideoDialogComponent, {
      data: this.task['video_data']
    });
  }

  openNearbyHospitals() {
    const dialogRef = this.dialog.open(NearbyHospitalsDialogComponent, {
      data: {
        location: this.task['location'],
        hospitals: this.task['nearby_hospitals'],
        decision_risk: this.task['decision_risk']
      }
    });
  }

  vote(value: boolean) {
    this.db.vote(this.task.task_id, value);
    this._router.navigate(['/history']);
  }
}

@Component({
  selector: 'app-user-video-dialog',
  templateUrl: './dialog/user-video-dialog.component.html',
  styleUrls: ['./dialog/user-video-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserVideoDialogComponent implements OnInit {

  api: VgAPI;
  track: TextTrack;
  points = [];
  url: string;
  private textCues = [];
  activeCue: any;

  constructor(public dialogRef: MatDialogRef<UserVideoDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.url = data.video_url;
    this.data.cues.forEach((c, i) => {
      this.points.push({second: c.second, time: c.second.toTimestampString(), text: c.text});
      const vttCue = new VTTCue(c.second, c.second + 1, c.text);
      vttCue.id = i;
      this.textCues.push(vttCue);
    });
  }

  onPlayerLoad(api: VgAPI) {
    this.api = api;
    this.api.addTextTrack('metadata', 'Metadata', 'en');
    this.track = this.api.textTracks[0];
    this.track.mode = 'showing';
    this.textCues.forEach(tc => this.track.addCue(tc));
    fromEvent(<any>this.track, 'cuechange').subscribe(this.onCueChange.bind(this));
  }

  onCueChange($event: any) {
    this.activeCue = $event.target.activeCues[0];
  }

  ngOnInit() {
  }

  close(): void {
    this.dialogRef.close();
  }

  jumpTo(sec: number): void {
    this.api.seekTime(sec);
  }
}

const MARKER_OBJECT = {
  url: './assets/images/ic_pin_accident.svg',
  scaledSize: {
    width: 47,
    height: 62
  }
};

@Component({
  selector: 'app-nearby-hospitals',
  templateUrl: './dialog/nearby-hospitals-dialog.html',
  styleUrls: ['./dialog/nearby-hospitals-dialog.scss']
})
export class NearbyHospitalsDialogComponent implements OnInit {

  position: any;
  hospitals: any;
  decision_risk: string;

  constructor(public dialogRef: MatDialogRef<NearbyHospitalsDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, private sanitizer: DomSanitizer) {
    this.position = {
      lat: data.location.lat,
      lng: data.location.lng,
      marker: MARKER_OBJECT
    };
    this.hospitals = data.hospitals;
    this.decision_risk = data.decision_risk;
    this.hospitals.forEach((hospital, i) => {
      hospital.marker = this.getHospitalMarker(hospital);
    });
  }

  ngOnInit(): void {
  }

  close(): void {
    this.dialogRef.close();
  }

  getHospitalMarker(hospital): any {
    const hospitalMarker = Object.assign({}, MARKER_OBJECT);
    hospitalMarker.url = hospital.selected ? './assets/images/ic_pin_hospital_selected.svg' : './assets/images/ic_pin_hospital.svg';
    return hospitalMarker;
  }
}
