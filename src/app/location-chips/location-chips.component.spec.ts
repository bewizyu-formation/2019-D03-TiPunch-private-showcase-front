import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationChipsComponent } from './location-chips.component';

describe('LocationChipsComponent', () => {
  let component: LocationChipsComponent;
  let fixture: ComponentFixture<LocationChipsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationChipsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationChipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
