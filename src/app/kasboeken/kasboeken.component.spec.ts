import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KasboekenComponent } from './kasboeken.component';

describe('KasboekenComponent', () => {
  let component: KasboekenComponent;
  let fixture: ComponentFixture<KasboekenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KasboekenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KasboekenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
