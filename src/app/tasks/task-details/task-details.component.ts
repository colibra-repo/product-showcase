import {AfterViewInit, ChangeDetectionStrategy, Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';
import {SafeResourceUrl} from '@angular/platform-browser/src/security/dom_sanitization_service';
import {VgAPI} from 'videogular2/core';
import {fromEvent} from 'rxjs';

declare var VTTCue;

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.scss']
})
export class TaskDetailsComponent implements OnInit {

  task = {
    id: '1983'
  };

  constructor(public dialog: MatDialog) {
  }

  ngOnInit() {
  }

  openVideo(vid) {
    const dialogRef = this.dialog.open(UserVideoDialogComponent, {
      data: {
        vid: vid,
        cues: [
          {second: 5, text: 'First key moment'},
          {second: 10, text: 'Second key moment'},
          {second: 20, text: 'Third key moment'},
          {second: 50, text: 'Fourth key moment'},
          {second: 60, text: 'Fifth key moment'},
        ]
      }
    });
  }

  openNearbyHospitals() {
    const dialogRef = this.dialog.open(NearbyHospitalsDialogComponent, {
      data: {
        lat: -6.2658911,
        lng: 39.5285832
      }
    });
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
  private textCues = [];
  activeCue: any;

  constructor(public dialogRef: MatDialogRef<UserVideoDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
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

@Component({
  selector: 'app-nearby-hospitals',
  templateUrl: './dialog/nearby-hospitals-dialog.html',
  styleUrls: ['./dialog/nearby-hospitals-dialog.scss']
})
export class NearbyHospitalsDialogComponent implements OnInit {

  lat: number;
  lng: number;

  constructor(public dialogRef: MatDialogRef<NearbyHospitalsDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, private sanitizer: DomSanitizer) {
    this.lat = data.lat;
    this.lng = data.lng;
  }

  ngOnInit(): void {
  }

  close(): void {
    this.dialogRef.close();
  }
}
