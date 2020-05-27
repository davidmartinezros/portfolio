import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { AuthService } from '../firebase-auth/auth.service';
import { CarouselComponent } from '../carousel/carousel.component';
import { KnowledgeComponent } from '../knowledge/knowledge.component';
import { ExperienceComponent } from '../experience/experience.component';

@Component({
    selector: 'app-main',
    templateUrl: '../main/main.component.html',
})

export class MainComponent {

    public randomNumber: number = Math.floor(Math.random() * 4);

    public static updateStuff: Subject<any> = new Subject();

    constructor(public authService: AuthService) {

        MainComponent.updateStuff.subscribe(res => {
            // here fire functions that fetch the data from the api
            KnowledgeComponent.updateStuff.next(false);
            CarouselComponent.updateStuff.next(false);
            ExperienceComponent.updateStuff.next(false);
        });

    }

}
