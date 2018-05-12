import { TranslateLoader } from '@ngx-translate/core';

import { Observable } from 'rxjs';

import * as translationEs from 'assets/i18n/es.json';
import * as translationEn from 'assets/i18n/en.json';
import * as translationZh from 'assets/i18n/zh.json';

const TRANSLATIONS = {
  es: translationEs,
  en: translationEn,
  zh: translationZh
};

export class TranslateUniversalLoader implements TranslateLoader {
       
  constructor() {
  }

  public getTranslation(lang: string): Observable<any> {
    return Observable.of(TRANSLATIONS[lang]);
  }
}
  
export function translateFactory() {
    return new TranslateUniversalLoader();
}