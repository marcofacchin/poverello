import {Component, inject, OnInit} from '@angular/core';
import {ReactiveFormsModule, FormControl, FormGroup, FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {Afdeling} from './afdeling';
import {AfdelingService} from './afdeling.service';
import {KasboekService} from './kasboek.service';
import {VerrichtingenTabel} from './verrichtingentabel/verrichtingentabel.component';
import {NieuweverrichtingComponent} from './nieuweverrichting/nieuweverrichting.component';
import {SortHeaderArrowPosition} from '@angular/material/sort';
import {Cashmunten} from './cashmunten/cashmunten.component';
import {MatGridList, MatGridTile} from '@angular/material/grid-list';

@Component({
  selector: 'app-kasboeken',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule,
    MatSelectModule, MatInputModule, FormsModule, VerrichtingenTabel, NieuweverrichtingComponent, Cashmunten, MatGridList, MatGridTile
  ],
  templateUrl: './kasboeken.component.html',
  styleUrl: './kasboeken.component.css'
})

export class KasboekenComponent implements OnInit {
  kasboekFormulier = new FormGroup({
    afdeling: new FormControl(''),
    jaar: new FormControl({value: '', disabled: true}),
    maand: new FormControl(''),
  });
  afdelingService: AfdelingService = inject(AfdelingService);
  afdelingen: Afdeling[] = [];
  kasboekService: KasboekService = inject(KasboekService);
  jaren: number[] = [];
  maanden: number[] = [];
  afdelingId: number;
  jaar: number;
  maand: number;
  kasboekId: number;
  inhoudOnzichtbaar = false;
  paginaGeladen = false;
  verbergFormulier = true;
  laadtijd: number;
  refreshVerrichtingenTabel: number = 0;
  refreshNieuweVerrichting: number = 0;
  kleur1 = 'lightpink';
  kleur2 = 'lightblue';

  constructor() {
    const start = new Date().getTime();
    this.afdelingService.getAfdelingen('NL')
      .then((afdelingen) => {
        this.laadtijd = (new Date().getTime() - start)/60000;
        this.afdelingen = afdelingen;
        this.paginaGeladen = true;
        this.verbergFormulier = false;
        console.log("Geladen in " + this.laadtijd + " minuten");
      })
      .catch((error) => console.error('Kon afdelingen niet ophalen: ' + error));
  }

  ngOnInit() {
    this.inhoudOnzichtbaar = true;
    this.zetMaandInputUit();
  }

  updateVerrichtingenTabel() {
    this.refreshVerrichtingenTabel++;
  }

  updateNieuweVerrichting() {
    this.refreshNieuweVerrichting++;
  }

  public zetMaandInputUit() {
    this.kasboekFormulier.controls['maand'].disable();
  }

  getKasboekId() {
    if (!isNaN(this.afdelingId) && !isNaN(this.jaar) && !isNaN(this.maand)) {
      this.kasboekService.getKasboekId(this.afdelingId, this.jaar, this.maand)
        .then((data) => {
          this.kasboekId = data;
        })
        .catch((error) => {
          console.error('Kasboekid konden niet worden opgehaald: ' + error);
        });
    }
  }

  public afdelingHandler() {
    this.inhoudOnzichtbaar = true;
    const afdelingId = this.kasboekFormulier.controls.afdeling.value;
    if (afdelingId !== null) {
      this.afdelingId = parseInt(afdelingId);
      this.kasboekService.getJaren(this.afdelingId)
        .then((jaren) => {
          this.jaren = jaren;
          if (this.jaren.length !== 0) {
            this.kasboekFormulier.controls['jaar'].enable();
            this.kasboekFormulier.controls['maand'].disable();
          } else {
            this.kasboekFormulier.controls.jaar.reset();
            this.kasboekFormulier.controls['jaar'].disable();
            this.maanden = [];
            this.kasboekFormulier.controls['maand'].disable();
          }
        })
        .catch((error) => console.error('Kon jaren niet ophalen: ' + error));
    }
  }

  public jaarHandler() {
    this.inhoudOnzichtbaar = true;
    const jaar = this.kasboekFormulier.controls.jaar.value;
    if (jaar !== null) {
      this.jaar = parseInt(jaar);
      this.kasboekService.getMaanden(this.afdelingId, this.jaar)
        .then((maanden) => {
          this.maanden = maanden;
          console.log('maanden: ' + maanden);
          if (this.maanden.length !== 0) {
            this.kasboekFormulier.controls['maand'].enable();
          } else {
            this.kasboekFormulier.controls.maand.reset();
            this.kasboekFormulier.controls['maand'].disable();
          }
        })
        .catch((error) => console.error('Kon maanden niet ophalen: ' + error));
    }
  }

  public maandHandler() {
    const maand = this.kasboekFormulier.controls.maand.value;
    if (maand !== null) {
      this.maand = parseInt(maand);
      this.kasboekService.getKasboekId(this.afdelingId, this.jaar, this.maand)
        .then(data => this.kasboekId = data)
        .catch(error => console.error('Kasboek id kon niet worden opgehaald: ' + error));
      this.inhoudOnzichtbaar = false;
    }
  }

}
