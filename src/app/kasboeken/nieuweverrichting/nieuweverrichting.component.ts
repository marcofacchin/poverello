import {
  Component, ElementRef,
  EventEmitter,
  inject,
  Input,
  numberAttribute,
  OnChanges,
  OnInit,
  Output, Renderer2,
} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatOption} from "@angular/material/core";
import {MatSelect} from "@angular/material/select";
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCheckbox} from '@angular/material/checkbox';
import {MatButton, MatIconButton, MatMiniFabButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {KasboekService} from '../kasboek.service';
import {AsyncPipe, NgForOf} from '@angular/common';
import {MatAutocomplete, MatAutocompleteTrigger} from '@angular/material/autocomplete';
import {OmschrijvingComponent} from '../omschrijving/omschrijving.component';
import {VerrichtingsType} from './verrichtings-type';

@Component({
  selector: 'nieuweverrichting-formulier',
  standalone: true,
  imports: [
    FormsModule,
    MatFormField,
    MatFormFieldModule,
    MatLabel,
    MatOption,
    MatSelect,
    ReactiveFormsModule,
    MatInputModule,
    MatCheckbox,
    MatIconButton,
    MatIcon,
    MatMiniFabButton,
    AsyncPipe,
    MatAutocomplete,
    MatAutocompleteTrigger,
    MatButton,
    OmschrijvingComponent,
    NgForOf
  ],
  templateUrl: './nieuweverrichting.component.html',
  styleUrl: './nieuweverrichting.component.css'
})
export class NieuweverrichtingComponent implements OnInit, OnChanges {
  @Input({transform: numberAttribute}) afdelingId: number;
  @Input({transform: numberAttribute}) kasboekId: number;
  @Input({transform: numberAttribute}) refresh: number;
  @Output() updateVerrichtingenTabelEvent = new EventEmitter<boolean>();
  formulier = new FormGroup({
    volgnummer: new FormControl(''),
    dag: new FormControl(''),
    omschrijving: new FormControl(''),
    bedrag: new FormControl(''),
    ticket: new FormControl(false),
    type: new FormControl(''),
  });
  omschrijving: string;
  resetOmschrijvingControl: number = 0;
  kasboekService: KasboekService = inject(KasboekService);
  verrichtingstypesArray = Object.values(VerrichtingsType).slice(0,13);

  constructor(private renderer: Renderer2) {
  }

  verrichtingToevoegen() {
    console.log("nieuwe verrichting wordt toegevoegd");
    const volgnummerInput = this.formulier.controls.volgnummer.value;
    const dagInput = this.formulier.controls.dag.value;
    const bedragInput = this.formulier.controls.bedrag.value;
    const typeInput = this.formulier.controls.type.value;
    let ticketInput = false;
    if (this.formulier.controls.ticket.value !== null) {
      ticketInput = this.formulier.controls.ticket.value;
    }
    if (bedragInput !== null
      && volgnummerInput !== null
      && dagInput !== null
      && typeInput !== null
    ) {
      const nieuweverrichting = {
        volgnummer: parseInt(volgnummerInput),
        dag: parseInt(dagInput),
        bedrag: parseFloat(bedragInput),
        afdelingId: this.afdelingId,
        omschrijving: this.omschrijving,
        kasticket: ticketInput,
        verrichtingsType: typeInput
      };
      console.log(JSON.stringify(nieuweverrichting));
      this.kasboekService.postVerrichting(this.kasboekId, nieuweverrichting)
        .then(() => {
          this.updateVerrichtingenTabelEvent.emit(true);
          this.focusOpVolgnummer();
          this.formulier.controls.volgnummer.reset();
          this.formulier.controls.dag.reset();
          this.resetOmschrijvingControl++;
          this.formulier.controls.bedrag.reset();
          this.formulier.controls.ticket.reset();
          this.formulier.controls.type.reset();
        })
        .catch((error) => console.error(error));
    } else {
      console.error("niet alle inputs zijn oke");
      console.log(
        "afdelingId:" + this.afdelingId
        + "\nvolgnummer:" + volgnummerInput
        + "\nbedrag:" + bedragInput
        + "\ndag:" + dagInput
        + "\nomschrijving:" + this.omschrijving
        + "\nkasticket:" + ticketInput
        + "\ntype:" + typeInput
      );
    }
  }

  focusOpVolgnummer() {
    this.renderer.selectRootElement('#focusInput').focus();
  }

  ngOnInit() {
    this.focusOpVolgnummer();
    this.resetOmschrijvingControl++;
  }

  ngOnChanges() {
    this.focusOpVolgnummer();
    this.resetOmschrijvingControl++;
  }

  autocompleteHandler(inhoud: string) {
    this.omschrijving = inhoud;
  }

}
