import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OmschrijvingenComponent } from './omschrijvingen.component';

describe('OmschrijvingenComponent', () => {
  let component: OmschrijvingenComponent;
  let fixture: ComponentFixture<OmschrijvingenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OmschrijvingenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OmschrijvingenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
