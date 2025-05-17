import { Injectable } from '@angular/core';
import { Afdeling } from './afdeling';

@Injectable({
  providedIn: 'root'
})
export class AfdelingService {
  //url = 'http://localhost:8080/afdelingen';
  url = 'https://poverello.onrender.com/afdelingen';

  async getAfdelingen(): Promise<Afdeling[]> {
    const data = await fetch(this.url);
    return await data.json() ?? [];
  }
}
