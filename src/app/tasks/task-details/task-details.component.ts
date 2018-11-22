import {ChangeDetectionStrategy, Component, Inject, OnInit, ViewChild, ElementRef, Renderer2} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';
import {VgAPI} from 'videogular2/core';
import {fromEvent} from 'rxjs';
import * as case_data from '../../fixtures/first_case.json'

declare var VTTCue;

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.scss']
})
export class TaskDetailsComponent implements OnInit {
  @ViewChild('taskTypeIcon') taskTypeIcon: ElementRef;


  task = case_data
  iconClass: string;

  constructor(public dialog: MatDialog, private _renderer: Renderer2) {
    switch(case_data["insurance_type"]) { 
      case "Medical": { 
        this.iconClass = "fa-user-md"; 
        break; 
      } 
      default: { 
        this.iconClass = "fa-user-secret";
        break; 
      } 
    } 
  }

  ngOnInit() {
      this._renderer.addClass(this.taskTypeIcon.nativeElement, this.iconClass);
  }

  openVideo() {
    const dialogRef = this.dialog.open(UserVideoDialogComponent, {
      data: case_data["video_data"]
    });
  }

  openNearbyHospitals() {
    const dialogRef = this.dialog.open(NearbyHospitalsDialogComponent, {
      data: {
          location: case_data["location"],
          hospitals: case_data["nearby_hospitals"],
          decision_risk: case_data["decision_risk"]
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
  url: './assets/ic_pin_accident.svg',
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
    var hospitalMarker = Object.assign({}, MARKER_OBJECT);
    hospitalMarker.url = hospital.selected ? './assets/ic_pin_hospital_selected.svg' : './assets/ic_pin_hospital.svg'
    return  hospitalMarker;
  }
}
