import {Component, inject, Input, numberAttribute, OnChanges} from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {KasboekService} from '../kasboek.service';
import {Cashmetgewichten} from './cashmetgewichten';
import {VerrichtingsType} from '../nieuweverrichting/verrichtings-type';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';

export interface MuntGewichtBedrag {
  naam: string;
  gewicht: number;
  bedrag: number;
  grampereuro: number;
}

const ELEMENT_DATA: MuntGewichtBedrag[] = [
  {naam: '2E', gewicht: 100.20, bedrag: 123.20, grampereuro: 4.32},
  {naam: '1E', gewicht: 100.20, bedrag: 100.20, grampereuro: 7.62},
  {naam: '50cE', gewicht: 100.20, bedrag: 100.20, grampereuro: 15.8},
  {naam: '20cE', gewicht: 100.20, bedrag: 100.20, grampereuro: 29},
  {naam: '10cE', gewicht: 100.20, bedrag: 100.20, grampereuro: 42},
  {naam: 'bruinE', gewicht: 100.20, bedrag: 100.20, grampereuro: 84}
];


/**
 * @title Basic use of `<table mat-table>`
 */
@Component({
  selector: 'cashmunten-table',
  styleUrl: 'cashmunten.component.css',
  templateUrl: 'cashmunten.component.html',
  imports: [MatTableModule, MatFormField, MatInput, MatLabel, MatButton, FormsModule, ReactiveFormsModule],
  standalone: true
})
export class Cashmunten implements OnChanges {
  @Input({transform: numberAttribute}) kasboekId: number;
  displayedColumns: string[] = ['naam', 'gewicht', 'bedrag'];
  dataSource = ELEMENT_DATA;
  cashGewichten: Cashmetgewichten;
  kasboekService: KasboekService = inject(KasboekService);
  cashFormulier = new FormGroup({
    input0: new FormControl(''),
    input1: new FormControl(''),
    input2: new FormControl(''),
    input3: new FormControl(''),
    input4: new FormControl(''),
    input5: new FormControl('')
  });

  berekenTotaal(item: string) {
    let totaal = 0.0;
    if (item === 'gewicht') {
      totaal = this.dataSource.map(rij => rij.gewicht).reduce((som, element) => (som + element), 0);
    } else if (item === 'bedrag') {
      totaal = this.dataSource.map(rij => rij.bedrag).reduce((som, element) => (som + element), 0);
    }
    return parseFloat(totaal.toFixed(2));
  }

  berekenBedrag(rij: number) {
    this.dataSource[rij].bedrag = (this.dataSource[rij].gewicht/(this.dataSource[rij].grampereuro));
    this.dataSource[rij].bedrag = parseFloat(this.dataSource[rij].bedrag.toFixed(2));
  }

  laadCashGewichten() {
    if (!isNaN(this.kasboekId)) {
      this.kasboekService.getCash(this.kasboekId)
        .then(data => {
          this.cashGewichten = data;
          const cashGewichtenArray = Object.values(this.cashGewichten).slice(0,6);
          for (var i: number = 0; i<6; i++) {
            this.dataSource[i].gewicht = cashGewichtenArray[i];
            this.berekenBedrag(i);
          }
        })
        .catch((error) => {
          console.error('Gewichten cash konden niet worden opgehaald: ' + error);
        });
    }
  }

  waardeVanInput(rij: number) {
    switch (rij) {
      case 0:
        return this.cashFormulier.controls.input0.value;
      case 1:
        return this.cashFormulier.controls.input1.value;
      case 2:
        return this.cashFormulier.controls.input2.value;
      case 3:
        return this.cashFormulier.controls.input3.value;
      case 4:
        return this.cashFormulier.controls.input4.value;
      case 5:
        return this.cashFormulier.controls.input5.value;
      default:
        return null
    }
  }

  gewichtUpdateHandler(rij: number) {
    const inputwaarde = this.waardeVanInput(rij);
    if (inputwaarde !== null) {
      this.dataSource[rij].gewicht = parseFloat(inputwaarde);
    } else {
      this.dataSource[rij].gewicht = 0.0;
    }
    this.berekenBedrag(rij);
    this.kasboekService.wijzigGewicht(this.kasboekId, rij, this.dataSource[rij].gewicht);
  }

  ngOnChanges() {
    this.laadCashGewichten();
  }
}
