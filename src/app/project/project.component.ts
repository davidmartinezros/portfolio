import { Component, Input } from '@angular/core';
import { Project } from '../projects/project';
import { Subject }    from 'rxjs/Subject';

@Component({
    selector: 'app-project',
    templateUrl: '../project/project.component.html',
 })

 export class ProjectComponent {

    @Input() project: Project;

    constructor() {
    }
      
    ngOnInit(): void {
    }

 }
