import { Component } from '@angular/core';
import { Project } from '../projects/project';
import { ProjectService } from '../projects/project.service';
import { Subject }    from 'rxjs/Subject';

@Component({
    selector: 'app-history',
    templateUrl: '../history/history.component.html',
 })

 export class HistoryComponent {

    objectKeys = Object.keys;

    projects: Project[];

    public static updateStuff: Subject<any> = new Subject();

    constructor(
        private projectService: ProjectService) {
            HistoryComponent.updateStuff.subscribe(res => {
                // here fire functions that fetch the data from the api
                this.getProjects();
            });
    }
      
    ngOnInit(): void {
        this.getProjects();
    }

    getProjects(): void {
        this.projectService.getProjects()
            .then(projects => 
            { this.projects = projects }
        );
    }
 }
