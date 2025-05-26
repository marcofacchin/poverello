import {
  AfterViewInit,
  booleanAttribute,
  Component,
  inject,
  Input,
  input,
  numberAttribute,
  OnChanges,
  OnInit,
  SimpleChanges, ViewChild
} from '@angular/core';
import {MatRow, MatTableDataSource, MatTableModule} from '@angular/material/table';
import {Verrichting} from '../verrichting';
import {KasboekService} from '../kasboek.service';
import {KruisjeAlsTicketPipe} from './kruisje-als-ticket.pipe';
import {BedragInOfUitPipe} from './bedrag-in-of-uit.pipe';
import {NieuweverrichtingComponent} from "../nieuweverrichting/nieuweverrichting.component";
import {NgIf} from '@angular/common';
import {MatButton} from '@angular/material/button';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {ReactiveFormsModule} from '@angular/forms';
import {MatCheckbox} from '@angular/material/checkbox';
import {OmschrijvingComponent} from '../omschrijving/omschrijving.component';
import {MatSort, MatSortHeader, Sort, SortHeaderArrowPosition} from '@angular/material/sort';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {LeegAlsBlancoTypePipe} from './leeg-als-blanco-type.pipe';

/**
 * @title Basic use of `<table mat-table>`
 */
@Component({
  selector: 'verrichtingen-table',
  styleUrl: 'verrichtingentabel.component.css',
  templateUrl: 'verrichtingentabel.component.html',
  standalone: true,
  imports: [MatTableModule, KruisjeAlsTicketPipe, BedragInOfUitPipe, NieuweverrichtingComponent, NgIf, MatButton, MatFormField, MatInput, MatLabel, ReactiveFormsModule, MatCheckbox, OmschrijvingComponent, MatSortHeader, MatSort, LeegAlsBlancoTypePipe],
})

export class VerrichtingenTabel implements OnChanges, AfterViewInit {
  @Input({transform: numberAttribute}) afdelingId: number;
  @Input({transform: numberAttribute}) jaar: number;
  @Input({transform: numberAttribute}) maand: number;
  displayedColumns: string[] = ['volgnummer', 'dag', 'omschrijving', 'bedragin', 'bedraguit', 'ticket', 'type', 'wijzig', 'cancel', 'delete'];
  verrichtingen: Verrichting[] = [];
  dataSource = new MatTableDataSource(this.verrichtingen);
  kasboekService: KasboekService = inject(KasboekService);
  kasboekId: number;
  private _liveAnnouncer = inject(LiveAnnouncer);
  @ViewChild(MatSort) sort: MatSort;

  laadKasboek() {
    if (!isNaN(this.afdelingId) && !isNaN(this.jaar) && !isNaN(this.maand)) {
      this.kasboekService.getVerrichtingen(this.afdelingId, this.jaar, this.maand)
        .then(kasboekdata => {
          this.verrichtingen = kasboekdata.verrichtingen;
          this.dataSource.data = this.verrichtingen;
          this.kasboekId = kasboekdata.id;
          console.log("kasboek geladen");
          console.log('boljetten: ' + kasboekdata.cash.totaalBedragBiljetten);
          console.log('totaalBedragMunten2E: ' + kasboekdata.cashInEuro.totaalBedragMunten2E);
        })
        .catch((error) => {
          console.error('Verrichtingen konden niet worden opgehaald: ' + error);
          this.dataSource.data = [];
        });
    }
  }

  ngOnChanges() {
    console.log("kasboek wordt geladen");
    this.laadKasboek();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  updateTabel() {
    this.laadKasboek();
  }

  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  opslaan(oudeVolgnummer: number) {
    console.log('verrichting ' + oudeVolgnummer + ' wordt aangepast');
  }

  verwijderen(oudeVolgnummer: number) {
    console.log('verrichting ' + oudeVolgnummer + ' wordt verwijderd');
    this.kasboekService.verwijderVerrichting(this.kasboekId, oudeVolgnummer)
      .then(() => this.laadKasboek())
      .catch((error) => console.error('Fout: ' + error));
  }

  autocompleteHandler(inhoud: string) {
  }


}
