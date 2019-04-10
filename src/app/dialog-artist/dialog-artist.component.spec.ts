import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogArtistComponent } from './dialog-artist.component';

describe('DialogArtistComponent', () => {
  let component: DialogArtistComponent;
  let fixture: ComponentFixture<DialogArtistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogArtistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogArtistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
