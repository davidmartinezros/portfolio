import { Component } from '@angular/core';
import { AuthService } from '../firebase-auth/auth.service';
import { TranslateService } from '@ngx-translate/core';
import { DashboardContactComponent } from '../dashboard/dashboard-contact.component';
import { ActivatedRoute } from '@angular/router';
import { KnowledgeService } from './knowledge.service';
import { Knowledge } from './knowledge';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-main',
    templateUrl: '../main/main.component.html',
})

export class MainComponent {

    objectKeys = Object.keys;

    knowledges: Knowledge[];

    public static updateStuff: Subject<any> = new Subject();

    constructor(public authService: AuthService,
        private knowledgeService: KnowledgeService,
        private dashboardContactComponent: DashboardContactComponent) {
            MainComponent.updateStuff.subscribe(res => {
                // here fire functions that fetch the data from the api
                this.getKnowledges();
            });
    }

    ngOnInit(): void {
        this.getKnowledges();
    }

    getKnowledges() {
        this.knowledgeService.getKnowledges()
        .then(knowledges => 
            { this.knowledges = knowledges }
        );
    }
}
