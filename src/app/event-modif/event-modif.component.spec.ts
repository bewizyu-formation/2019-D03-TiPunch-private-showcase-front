import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventModifComponent } from './event-modif.component';

describe('EventModifComponent', () => {
  let component: EventModifComponent;
  let fixture: ComponentFixture<EventModifComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventModifComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventModifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
