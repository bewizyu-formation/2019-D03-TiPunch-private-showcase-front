import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserModifComponent } from './user-modif.component';

describe('UserModifComponent', () => {
  let component: UserModifComponent;
  let fixture: ComponentFixture<UserModifComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserModifComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserModifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
