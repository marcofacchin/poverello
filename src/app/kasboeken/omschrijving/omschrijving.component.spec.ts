import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OmschrijvingComponent } from './omschrijving.component';

describe('OmschrijvingComponent', () => {
  let component: OmschrijvingComponent;
  let fixture: ComponentFixture<OmschrijvingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OmschrijvingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OmschrijvingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
