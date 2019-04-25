import { TranslateLoader } from '@ngx-translate/core';
import * as translationEn from 'assets/i18n/en.json';
import * as translationEs from 'assets/i18n/es.json';
import * as translationZh from 'assets/i18n/zh.json';
import { Observable } from 'rxjs';
import { of } from 'rxjs/Observable/of';



const TRANSLATIONS = {
  es: translationEs,
  en: translationEn,
  zh: translationZh
};

export class TranslateUniversalLoader implements TranslateLoader {
       
  constructor() {
  }

  public getTranslation(lang: string): Observable<any> {
    return of(TRANSLATIONS[lang].default);
  }
}
  
export function translateFactory() {
    return new TranslateUniversalLoader();
}