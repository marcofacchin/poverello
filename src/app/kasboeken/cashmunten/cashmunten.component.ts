import {Component, inject, Input, numberAttribute, OnChanges} from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {KasboekService} from '../kasboek.service';
import {Cashmetgewichten} from './cashmetgewichten';
import {VerrichtingsType} from '../nieuweverrichting/verrichtings-type';

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
  imports: [MatTableModule, MatFormField, MatInput, MatLabel, MatButton],
  standalone: true
})
export class Cashmunten implements OnChanges {
  @Input({transform: numberAttribute}) kasboekId: number;
  displayedColumns: string[] = ['naam', 'gewicht', 'bedrag'];
  dataSource = ELEMENT_DATA;
  cashGewichten: Cashmetgewichten;
  kasboekService: KasboekService = inject(KasboekService);

  berekenTotaal(item: string) {
    if (item === 'gewicht') {
      return this.dataSource.map(rij => rij.gewicht).reduce((som, element) => (som + element), 0);
    } else if (item === 'bedrag') {
      return this.dataSource.map(rij => rij.bedrag).reduce((som, element) => (som + element), 0);
    } else {
      return 0;
    }
  }

  laadCashGewichten() {
    if (!isNaN(this.kasboekId)) {
      this.kasboekService.getCash(this.kasboekId)
        .then(data => {
          this.cashGewichten = data;
          const gewichtenarray = Object.values(this.cashGewichten).slice(0,6);
          for (var i: number = 0; i<6; i++) {
            this.dataSource[i].gewicht = gewichtenarray[i];
            this.dataSource[i].bedrag = (gewichtenarray[i]/(this.dataSource[i].grampereuro));
            this.dataSource[i].bedrag = parseFloat(this.dataSource[i].bedrag.toFixed(2));
          }
        })
        .catch((error) => {
          console.error('Gewichten cash konden niet worden opgehaald: ' + error);
        });
    }
  }

  ngOnChanges() {
    this.laadCashGewichten();
  }
}
