import { Component } from '@angular/core';
import { Project } from './project';
import { ProjectService } from './project.service';

@Component({
    selector: 'app-projects',
    templateUrl: '../projects/projects.component.html',
 })

 export class ProjectsComponent {

    projects: Project[];

    constructor(
        private projectService: ProjectService) {
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
