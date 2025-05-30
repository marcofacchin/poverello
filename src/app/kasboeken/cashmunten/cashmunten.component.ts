import {Component, Input, numberAttribute, OnInit} from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatButton} from '@angular/material/button';

export interface MuntGewichtBedrag {
  naam: string;
  gewicht: number;
  bedrag: number;
}

const ELEMENT_DATA: MuntGewichtBedrag[] = [
  {naam: '2E', gewicht: 100.20, bedrag: 123.20},
  {naam: '1E', gewicht: 100.20, bedrag: 100.20},
  {naam: '50cE', gewicht: 100.20, bedrag: 100.20},
  {naam: '20cE', gewicht: 100.20, bedrag: 100.20},
  {naam: '10cE', gewicht: 100.20, bedrag: 100.20},
  {naam: 'bruinE', gewicht: 100.20, bedrag: 100.20}
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
export class Cashmunten {
  @Input({transform: numberAttribute}) kasboekId: number;
  displayedColumns: string[] = ['naam', 'gewicht', 'bedrag'];
  dataSource = ELEMENT_DATA;

  berekenTotaal(item: string) {
    if (item === 'gewicht') {
      return this.dataSource.map(rij => rij.gewicht).reduce((som, element) => (som + element), 0);
    } else if (item === 'bedrag') {
      return this.dataSource.map(rij => rij.bedrag).reduce((som, element) => (som + element), 0);
    } else {
      return 0;
    }
  }
}
