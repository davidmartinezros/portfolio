import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { DashboardContactComponent } from '../dashboard/dashboard-contact.component';
import { AuthService } from '../firebase-auth/auth.service';
import { Knowledge } from './knowledge';
import { KnowledgeService } from './knowledge.service';

@Component({
    selector: 'app-main',
    templateUrl: '../main/main.component.html',
})

export class MainComponent {

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
            .then(knowledges => this.knowledges = knowledges );
    }
}
