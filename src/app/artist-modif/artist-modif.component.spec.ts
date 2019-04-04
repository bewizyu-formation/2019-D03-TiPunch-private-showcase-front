import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistModifComponent } from './artist-modif.component';

describe('ArtistModifComponent', () => {
  let component: ArtistModifComponent;
  let fixture: ComponentFixture<ArtistModifComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArtistModifComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtistModifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
