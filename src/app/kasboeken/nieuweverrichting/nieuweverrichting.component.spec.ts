import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NieuweverrichtingComponent } from './nieuweverrichting.component';

describe('NieuweverrichtingComponent', () => {
  let component: NieuweverrichtingComponent;
  let fixture: ComponentFixture<NieuweverrichtingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NieuweverrichtingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NieuweverrichtingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
