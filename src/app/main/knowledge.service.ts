import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { TranslateService } from '@ngx-translate/core';
import 'rxjs/add/operator/toPromise';
import { Knowledge } from './knowledge';



@Injectable()
export class KnowledgeService {
    
    //private projectsUrl = './assets/i18n/es.json';  // URL to web api
    private headers = new Headers({'Content-Type': 'application/json'});

    constructor(
        private http: Http,
        private translate: TranslateService) { }

    getKnowledges(): Promise<Knowledge[]> {
        return this.translate.get("knowledges")
            .toPromise()
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }

}