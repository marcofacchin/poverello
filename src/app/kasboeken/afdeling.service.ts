import { Injectable } from '@angular/core';
import { Afdeling } from './afdeling';

//MOCK
import afdelingen_mock from './mockdata_afdelingen.json';

@Injectable({
  providedIn: 'root'
})
export class AfdelingService {
  url = 'http://localhost:8080/afdelingen';

  async getAfdelingen(): Promise<Afdeling[]> {
/*    const data = await fetch(this.url);
    return await data.json() ?? [];*/
    return afdelingen_mock;
  }
}
