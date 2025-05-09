import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'bedragInOfUit',
  standalone: true
})
export class BedragInOfUitPipe implements PipeTransform {

  transform(value: number, format: string): string {
    let msg = `My custom transformation of ${value}.`
    if (format === 'UIT') {
      if (value < 0) {
        return Math.abs(value).toString();
      } else {
        return '';
      }
    } else {
      if (value > 0) {
        return value.toString();
      } else {
        return '';
      }
    }
  }

}
