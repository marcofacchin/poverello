import { Injectable } from '@angular/core';
import { Omschrijvingbeknopt } from './omschrijvingbeknopt';

@Injectable({
  providedIn: 'root'
})
export class OmschrijvingService {
  url = 'http://localhost:8080/omschrijvingen';

  async getOmschrijvingen(afdelingId: number): Promise<Omschrijvingbeknopt[]> {
    const omschrijvingenUrl = this.url + `/${afdelingId}`;
    const data = await fetch(omschrijvingenUrl);
    return await data.json() ?? [];
  }

  async verwijderOmschrijving(id: number) {
    const omschrijvingenUrl = this.url + `/${id}`;
    const response = await fetch(omschrijvingenUrl,
      {
        method: "DELETE"
      });
    if (!response.ok) {
      console.error('Fout bij verwijderen omschrijving');
    }
  }
}
