import { PipeTransform, Pipe } from '@angular/core';

@Pipe({name: 'random'})
export class RandomPipe implements PipeTransform {

  transform(value, number:number) : any {
    if(number >= 0) {
        return value[number];
    }
    return null;
  }

}