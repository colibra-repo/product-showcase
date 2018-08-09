import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryTaskCardComponent } from './history-task-card.component';

describe('HistoryTaskCardComponent', () => {
  let component: HistoryTaskCardComponent;
  let fixture: ComponentFixture<HistoryTaskCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoryTaskCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryTaskCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
