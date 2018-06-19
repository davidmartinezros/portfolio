import { Component } from '@angular/core';
import { Project } from './project';
import { ProjectService } from './project.service';
import { Subject }    from 'rxjs/Subject';

@Component({
    selector: 'app-projects',
    templateUrl: '../projects/projects.component.html',
 })

 export class ProjectsComponent {

    objectKeys = Object.keys;

    projects: Project[];

    public static updateStuff: Subject<any> = new Subject();

    constructor(
        private projectService: ProjectService) {
            ProjectsComponent.updateStuff.subscribe(res => {
                // here fire functions that fetch the data from the api
                this.getProjects();
            });
    }
      
    ngOnInit(): void {
        this.getProjects();
    }

    getProjects(): void {
        this.projectService.getTheTop20Projects()
            .then(projects => 
            { this.projects = projects }
        );
    }
 }
