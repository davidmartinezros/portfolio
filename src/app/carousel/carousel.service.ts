import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import 'rxjs/add/operator/toPromise';
import { Image } from './Image';



@Injectable()
export class CarouselService {
    
    private headers = new HttpHeaders({'Content-Type': 'application/json'});

    constructor(
        private translate: TranslateService) { }

    getImages(): Promise<Image[]> {
        return this.translate.get("images")
            .toPromise()
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }

}