import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'kruisjeAlsTicket',
  standalone: true
})
export class KruisjeAlsTicketPipe implements PipeTransform {

  transform(value: boolean): string {
    return value ? 'X' : '';
  }

}
