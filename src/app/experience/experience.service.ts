import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import 'rxjs/add/operator/toPromise';
import { Experience } from './experience';



@Injectable()
export class ExperienceService {
    
    private headers = new HttpHeaders({'Content-Type': 'application/json'});

    constructor(
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