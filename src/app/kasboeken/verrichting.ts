import {VerrichtingsType} from './nieuweverrichting/verrichtings-type';

export interface Verrichting {
  volgnummer: number;
  dag: number;
  bedrag: number;
  omschrijving: string;
  kasticket: boolean;
  verrichtingsType: string;
}
