import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterTicks',
  pure: false
})
export class FilterTicksPipe implements PipeTransform {

  transform(ticks: any[], filter?: {by:any, value:any}): any {
    if (filter.by === ''){
      return ticks;
    } else {
      return ticks.filter(entry => entry[filter.by] === filter.value);
    }
  }

}
