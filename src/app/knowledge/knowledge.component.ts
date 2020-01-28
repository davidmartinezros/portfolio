import { Component } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Knowledge } from './knowledge';
import { KnowledgeService } from './knowledge.service';

@Component({
    selector: 'app-knowledge',
    templateUrl: '../knowledge/knowledge.component.html'
})

export class KnowledgeComponent {

    knowledges: Knowledge[];

    public static updateStuff: Subject<any> = new Subject();
    
    constructor(
        private knowledgeService: KnowledgeService) {
            KnowledgeComponent.updateStuff.subscribe(res => {
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
