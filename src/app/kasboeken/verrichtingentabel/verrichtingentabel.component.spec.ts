import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerrichtingentabelComponent } from './verrichtingentabel.component';

describe('VerrichtingentabelComponent', () => {
  let component: VerrichtingentabelComponent;
  let fixture: ComponentFixture<VerrichtingentabelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerrichtingentabelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerrichtingentabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
