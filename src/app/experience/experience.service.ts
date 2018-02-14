import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Headers, Http, Response } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Experience } from './experience';

@Injectable()
export class ExperienceService {
    
    private headers = new Headers({'Content-Type': 'application/json'});

    constructor(
        private http: Http,
        private translate: TranslateService) { }

    getExperiences(): Promise<Experience[]> {
        return this.translate.get("experiences")
            .toPromise()
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }

}