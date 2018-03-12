import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainersAllComponent } from './trainers-all.component';

describe('TrainersAllComponent', () => {
  let component: TrainersAllComponent;
  let fixture: ComponentFixture<TrainersAllComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainersAllComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainersAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
