import { Component } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Experience } from './experience';
import { ExperienceService } from './experience.service';

@Component({
    selector: 'app-experience',
    templateUrl: '../experience/experience.component.html'
})

export class ExperienceComponent {

    experiences: Experience[];

    public static updateStuff: Subject<any> = new Subject();
    
    constructor(
        private experienceService: ExperienceService) {
            ExperienceComponent.updateStuff.subscribe(res => {
                // here fire functions that fetch the data from the api
                this.getExperiences();
            });
    }

    ngOnInit(): void {
        this.getExperiences();
    }

    getExperiences(): void {
        this.experienceService.getExperiences()
            .then(experiences => this.experiences = experiences );
    }
}
