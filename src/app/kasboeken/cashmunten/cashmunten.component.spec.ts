import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashmuntenComponent } from './cashmunten.component';

describe('CashmuntenComponent', () => {
  let component: CashmuntenComponent;
  let fixture: ComponentFixture<CashmuntenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CashmuntenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CashmuntenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
