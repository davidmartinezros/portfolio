import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { PreloadingStrategy, Route } from '@angular/router';
 
@Injectable()
export class CustomPreloadingStrategy implements PreloadingStrategy {
  preload(route : Route, load : Function) : Observable<any> {
    return route.data && route.data.preload ? load() : of(null);
  }
}