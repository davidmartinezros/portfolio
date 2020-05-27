import { PipeTransform, Pipe } from '@angular/core';

@Pipe({name: 'decodeURI'})
export class DecodeUrlPipe implements PipeTransform {

  transform(value) : any {
    return decodeURI(encodeURI(value));
  }

}