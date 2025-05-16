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
import {AsyncPipe} from '@angular/common';
import {MatAutocomplete, MatAutocompleteTrigger} from '@angular/material/autocomplete';
import {OmschrijvingComponent} from '../omschrijving/omschrijving.component';

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
    OmschrijvingComponent
  ],
  templateUrl: './nieuweverrichting.component.html',
  styleUrl: './nieuweverrichting.component.css'
})
export class NieuweverrichtingComponent implements OnInit, OnChanges {
  types = [
    {naam: "N", id: 0},
    {naam: "DONTV", id: 1},
    {naam: "VERBL", id: 2},
    {naam: "TRF", id: 3},
  ];
  @Input({transform: numberAttribute}) afdelingId: number;
  @Input({transform: numberAttribute}) kasboekId: number;
  @Output() updateVerrichtingenTabelEvent = new EventEmitter<boolean>();
  formulier = new FormGroup({
    volgnummer: new FormControl(''),
    dag: new FormControl(''),
    omschrijving: new FormControl(''),
    bedrag: new FormControl(''),
    ticket: new FormControl(false),
  });
  omschrijving: string;
  resetOmschrijvingControl: number = 0;
  kasboekService: KasboekService = inject(KasboekService);

  constructor(private renderer: Renderer2) {
  }

  verrichtingToevoegen() {
    console.log("nieuwe verrichting wordt toegevoegd");
    const bedragInput = this.formulier.controls.bedrag.value;
    const volgnummerInput = this.formulier.controls.volgnummer.value;
    const dagInput = this.formulier.controls.dag.value;
    let ticketInput = false;
    if (this.formulier.controls.ticket.value !== null) {
      ticketInput = this.formulier.controls.ticket.value;
    }
    console.log("ticketInput value: " + this.formulier.controls.ticket.value);
    console.log("ticketInput: " + ticketInput);
    if (bedragInput !== null
      && volgnummerInput !== null
      && dagInput !== null) {
      const nieuweverrichting = {
        volgnummer: parseInt(volgnummerInput),
        dag: parseInt(dagInput),
        bedrag: parseFloat(bedragInput),
        afdelingId: this.afdelingId,
        omschrijving: this.omschrijving,
        kasticket: ticketInput
      };
      this.kasboekService.postVerrichting(this.kasboekId, nieuweverrichting)
        .then(() => {
          this.updateVerrichtingenTabelEvent.emit(true);
          this.focusOpVolgnummer();
          this.formulier.controls.bedrag.reset();
          this.formulier.controls.ticket.reset();
          this.resetOmschrijvingControl++;
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
      );
    }
  }

  focusOpVolgnummer() {
    this.renderer.selectRootElement('#focusInput').focus();
  }

  ngOnInit() {
    this.focusOpVolgnummer();
  }

  ngOnChanges() {
    this.focusOpVolgnummer();
  }

  autocompleteHandler(inhoud: string) {
    this.omschrijving = inhoud;
  }


}
