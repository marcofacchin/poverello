import { Injectable } from '@angular/core';
import {Verrichting} from './verrichting';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class KasboekService {
  url = environment.apiUrl + '/kasboeken';

  async getJaren(afdelingId: number): Promise<number[]> {
    const jarenUrl = this.url + `/${afdelingId}/jaren`;
    const data = await fetch(jarenUrl);
    return await data.json() ?? [];
  }

  async getMaanden(afdelingId: number, jaar: number): Promise<number[]> {
    const maandenUrl = this.url + `/${afdelingId}/${jaar}/maanden`;
    const data = await fetch(maandenUrl);
    return await data.json() ?? [];
  }

  async getVerrichtingen(kasboekId: number) {
    const verrichtingUrl = this.url + `/${kasboekId}/verrichtingen`;
    const data = await fetch(verrichtingUrl);
    if (data.ok) {
      return await data.json() ?? [];
    } else {
      console.error('Fout bij ophalen verrichtingen');
    }
  }

  async getKasboekId(afdelingId: number, jaar: number, maand: number) {
    const kasboekIdUrl = this.url + `/${afdelingId}/${jaar}/${maand}/kasboekid`;
    const data = await fetch(kasboekIdUrl);
    if (data.ok) {
      return await data.json() ?? [];
    } else {
      console.error('Fout bij ophalen kasboekid');
    }
  }

  async getCash(kasboekId: number) {
    const cashUrl = this.url + `/${kasboekId}/cash`;
    const data = await fetch(cashUrl);
    if (data.ok) {
      return await data.json() ?? [];
    } else {
      console.error('Fout bij ophalen cash gewichten');
    }
  }

  async postVerrichting(kasboekId: number, nieuweVerrichting: Verrichting) {
    const postverrichtingUrl = this.url + `/${kasboekId}/verrichtingen`;
    const response = await fetch(postverrichtingUrl,
  {
        method: "POST",
        headers: {'Content-Type': "application/json"},
        body: JSON.stringify(nieuweVerrichting)
      });
    if (response.ok) {
      console.log('nieuwe verrichting gepost');
    } else {
      console.error('verrichting kon niet worden gepost: response status: ' + response.status);
    }
  }

  async verwijderVerrichting(kasboekId: number, volgnummer: number) {
    const verrichtingUrl = this.url + `/${kasboekId}/verrichtingen/${volgnummer}`;
    const response = await fetch(verrichtingUrl,
      {
        method: "DELETE"
      });
    if (!response.ok) {
      console.error('Fout bij verwijderen verrichting ' + response.status);
    }
  }

  async wijzigGewicht(kasboekId: number, muntId: number, gewicht: number) {
    const fullUrl = this.url + `/${kasboekId}/${muntId}/muntgewicht`;
    const response = await fetch(fullUrl,
      {
        method: "PATCH",
        headers: {'Content-Type': "application/json"},
        body: JSON.stringify(gewicht)
      });
    if (response.ok) {
      console.log('gewicht aangepast');
    } else {
      console.error('Fout bij aanpassen gewicht ' + response.status);
    }
  }

  /*
  public getRandomVerrichtingen(): Verrichting[] {
    let result: Verrichting[] = [];
    for (let i = 0; i < 10; i++) {
      let randomInt = Math.floor(Math.random() * (ELEMENT_DATA.length - 1));
      result.push(ELEMENT_DATA[randomInt]);
    }
    return result;
  }
  */

}

/*const ELEMENT_DATA: Verrichting[] = [
  {volgnummer: 1, dag: 1, omschrijving: 'Hydrogen', bedrag: 1.0079, ticket: true, type: 'H'},
  {volgnummer: 2, dag: 1, omschrijving: 'Hydrogen', bedrag: 1.0079, ticket: true, type: 'H'},
  {volgnummer: 3, dag: 1, omschrijving: 'Hydrogen', bedrag: 1.0079, ticket: true, type: 'H'},
  {volgnummer: 4, dag: 1, omschrijving: 'Hydrogen', bedrag: 1.0079, ticket: true, type: 'H'},
  {volgnummer: 5, dag: 1, omschrijving: 'Hydrogen', bedrag: 1.0079, ticket: true, type: 'H'},
  {volgnummer: 6, dag: 1, omschrijving: 'Hydrogen', bedrag: 1.0079, ticket: true, type: 'H'},
  {volgnummer: 7, dag: 1, omschrijving: 'Hydrogen', bedrag: 1.0079, ticket: true, type: 'H'},
  {volgnummer: 8, dag: 1, omschrijving: 'Hydrogen', bedrag: 1.0079, ticket: true, type: 'H'},
  {volgnummer: 9, dag: 1, omschrijving: 'Hydrogen', bedrag: 1.0079, ticket: true, type: 'H'},
  {volgnummer: 10, dag: 1, omschrijving: 'Hydrogen', bedrag: 1.0079, ticket: true, type: 'H'},
  {volgnummer: 11, dag: 1, omschrijving: 'Hydrogen', bedrag: 1.0079, ticket: true, type: 'H'},
  {volgnummer: 12, dag: 1, omschrijving: 'Hydrogen', bedrag: 1.0079, ticket: true, type: 'H'},
  {volgnummer: 13, dag: 1, omschrijving: 'Hydrogen', bedrag: 1.0079, ticket: true, type: 'H'},
  {volgnummer: 14, dag: 1, omschrijving: 'Hydrogen', bedrag: 1.0079, ticket: true, type: 'H'},
  {volgnummer: 15, dag: 1, omschrijving: 'Hydrogen', bedrag: 1.0079, ticket: true, type: 'H'},
];*/
