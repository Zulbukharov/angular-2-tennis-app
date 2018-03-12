import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturedNewsComponent } from './featured-news.component';

describe('FeaturedNewsComponent', () => {
  let component: FeaturedNewsComponent;
  let fixture: ComponentFixture<FeaturedNewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeaturedNewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeaturedNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
