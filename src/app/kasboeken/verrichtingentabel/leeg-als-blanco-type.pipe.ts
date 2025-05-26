import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'leegAlsBlancoType',
  standalone: true
})
export class LeegAlsBlancoTypePipe implements PipeTransform {

  transform(value: string): string {
    if (value === 'BLANCO') {
      return '';
    } else {
      return value;
    }
  }

}
