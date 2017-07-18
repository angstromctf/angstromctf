/**
 * A pipe that displays a number as an ordinal, e.g. 1st or 12th.
 */

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ordinal'
})
export class OrdinalPipe implements PipeTransform {
  transform(value: number): string {
    let str: string = String(value);
    if (value % 10 == 1 && value % 100 != 11) return str + 'st';
    if (value % 10 == 2 && value % 100 != 12) return str + 'nd';
    if (value % 10 == 3 && value % 100 != 13) return str + 'rd';
    else return str + 'th';
  }
}
