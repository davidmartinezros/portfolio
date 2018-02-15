import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from "@angular/platform-browser";

@Pipe({ name: 'convertToArray' })
export class ConvertToArrayPipe implements PipeTransform {
  
  constructor() {}

  transform (value, args) {
    return Array.from(value);
  }
} 
