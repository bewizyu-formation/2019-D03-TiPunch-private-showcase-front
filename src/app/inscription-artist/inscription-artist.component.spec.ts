import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InscriptionArtistComponent } from './inscription-artist.component';

describe('InscriptionArtistComponent', () => {
  let component: InscriptionArtistComponent;
  let fixture: ComponentFixture<InscriptionArtistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InscriptionArtistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InscriptionArtistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
