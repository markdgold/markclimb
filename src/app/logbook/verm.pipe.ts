import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'verm'
})
export class VermPipe implements PipeTransform {

  transform(value: number, args?: any): string {
    return 'V'+value;
  }

}
