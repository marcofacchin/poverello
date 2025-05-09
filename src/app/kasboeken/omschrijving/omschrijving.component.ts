import {
  booleanAttribute,
  Component,
  EventEmitter,
  inject,
  Input,
  numberAttribute,
  OnChanges,
  OnInit,
  Output
} from '@angular/core';
import {AsyncPipe} from "@angular/common";
import {MatAutocomplete, MatAutocompleteTrigger, MatOption} from "@angular/material/autocomplete";
import {MatFormField, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {Observable} from 'rxjs';
import {OmschrijvingService} from "./omschrijving.service";
import {map, startWith} from 'rxjs/operators';
import {MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {Omschrijvingbeknopt} from './omschrijvingbeknopt';

@Component({
  selector: 'app-omschrijving',
  standalone: true,
  imports: [
    AsyncPipe,
    MatAutocomplete,
    MatAutocompleteTrigger,
    MatFormField,
    MatInput,
    MatLabel,
    MatOption,
    ReactiveFormsModule,
    MatSuffix,
    MatIconButton,
    MatIcon
  ],
  templateUrl: './omschrijving.component.html',
  styleUrl: './omschrijving.component.css'
})
export class OmschrijvingComponent implements OnInit, OnChanges {
  @Input({transform: numberAttribute}) afdelingId: number;
  @Input() initvalue: string;
  @Input({transform: numberAttribute}) reset: number;
  @Output() autocompleteEvent = new EventEmitter<string>();
  autocompleteFormulier = new FormGroup({
    omschrijving: new FormControl('')
  });
  omschrijvingen: Omschrijvingbeknopt[] = [];
  filteredOmschrijvingen: Observable<Omschrijvingbeknopt[]>;
  omschrijvingService: OmschrijvingService = inject(OmschrijvingService);

  ngOnInit() {
    this.autocompleteFormulier.controls.omschrijving.setValue(this.initvalue);
    this.filteredOmschrijvingen = this.autocompleteFormulier.controls.omschrijving.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

  ngOnChanges() {
    console.log("autocomplete wordt gereset");
    this.autocompleteFormulier.controls.omschrijving.reset();
    if (!isNaN(this.afdelingId)) {
      this.omschrijvingService.getOmschrijvingen(this.afdelingId)
        .then(beknopteomschrijvingen => {
          this.omschrijvingen = beknopteomschrijvingen;
        })
        .catch((error) => console.error('Omschrijvingen konden niet worden opgehaald: ' + error));
    }
  }

  /* omschrijvingen filter */
  private _filter(value: string): Omschrijvingbeknopt[] {
    const filterValue = value.toLowerCase();
    return this.omschrijvingen.filter(omschrijvingbeknopt => omschrijvingbeknopt.inhoud.toLowerCase().includes(filterValue));
  }

  autocompleteChange() {
    const value = this.autocompleteFormulier.controls.omschrijving.value;
    if (value === null) {
      this.autocompleteEvent.emit('');
    } else {
      this.autocompleteEvent.emit(value);
    }
  }

  deleteOmschrijving(id: number) {
    console.log("omschrijving met id nr " + id + " wordt verwijderd");
    this.omschrijvingService.verwijderOmschrijving(id)
      .catch((error) => console.error('Omschrijving kon niet worden verwijderd: ' + error))
}

}
