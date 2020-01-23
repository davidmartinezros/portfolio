import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import 'rxjs/add/operator/toPromise';
import { Language } from './language';



@Injectable()
export class LanguageService {
    
    //private projectsUrl = './assets/i18n/es.json';  // URL to web api
    private headers = new HttpHeaders({'Content-Type': 'application/json'});

    constructor(
        private translate: TranslateService) { }

    getLanguages(): Promise<Language[]> {
        return this.translate.get("languages")
            .toPromise()
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }

}