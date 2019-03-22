import { Component } from '@angular/core';
import { AuthService } from '../firebase-auth/auth.service';
import { TranslateService } from '@ngx-translate/core';
import { DashboardContactComponent } from '../dashboard/dashboard-contact.component';
import { ActivatedRoute } from '@angular/router';
import { KnowledgeService } from './knowledge.service';
import { Knowledge } from './knowledge';

@Component({
    selector: 'app-main',
    templateUrl: '../main/main.component.html',
})

export class MainComponent {

    objectKeys = Object.keys;

    knowledges: Knowledge[];

    constructor(public authService: AuthService,
        private knowledgeService: KnowledgeService,
        private dashboardContactComponent: DashboardContactComponent) {
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
