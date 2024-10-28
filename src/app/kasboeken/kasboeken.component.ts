import {Component, OnInit} from '@angular/core';
import { OmschrijvingenComponent } from './omschrijvingen/omschrijvingen.component';
import {ReactiveFormsModule, FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-kasboeken',
  standalone: true,
  imports: [OmschrijvingenComponent, ReactiveFormsModule],
  templateUrl: './kasboeken.component.html',
  styleUrl: './kasboeken.component.css'
})
export class KasboekenComponent implements OnInit {
  kasboekFormulier = new FormGroup({
    afdeling: new FormControl(''),
    jaar: new FormControl({value: '', disabled: true}),
    maand: new FormControl(''),
  });

  public zetVeldUit() {
    this.kasboekFormulier.controls['maand'].disable();
  }

  ngOnInit() {
    this.zetVeldUit();
  }

}
