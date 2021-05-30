import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MinimumDistanceComponent } from './minimum-distance.component';

describe('MinimumDistanceComponent', () => {
  let component: MinimumDistanceComponent;
  let fixture: ComponentFixture<MinimumDistanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MinimumDistanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MinimumDistanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
