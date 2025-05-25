import { Injectable } from '@angular/core';
import { Afdeling } from './afdeling';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AfdelingService {
  url = environment.apiUrl + '/afdelingen';

  async getAfdelingen(taal: String): Promise<Afdeling[]> {
    const data = await fetch(this.url + `/${taal}`);
    return await data.json() ?? [];
  }
}
