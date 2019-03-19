import { Component } from '@angular/core';
import { Project } from './project';
import { ProjectService } from './project.service';
import { Subject }    from 'rxjs/Subject';
import { TranslateService } from '@ngx-translate/core';
import { TemplateComponent } from '../template/template.component';

@Component({
    selector: 'app-projects',
    templateUrl: '../projects/projects.component.html',
 })

 export class ProjectsComponent {

    objectKeys = Object.keys;

    projects: Project[];

    demo: string;

    git: string;

    detall: string;

    public static updateStuff: Subject<any> = new Subject();

    constructor(
        private projectService: ProjectService,
        private translate: TranslateService) {
            ProjectsComponent.updateStuff.subscribe(res => {
                // here fire functions that fetch the data from the api
                this.getProjects();
                this.getTextLinks();
            });
    }
      
    ngOnInit(): void {
        this.getProjects();
        this.getTextLinks();
    }

    getTextLinks() {
        this.translate.get("TextDemo")
            .toPromise()        
            .then(demo => {
                this.demo = demo;
            }
        );
        this.translate.get("TextGit")
            .toPromise()        
            .then(git => {
                this.git = git;
            }
        );
        this.translate.get("TextDetall")
            .toPromise()        
            .then(detall => {
                this.detall = detall;
            }
        );
    }

    getProjects(): void {
        this.projectService.getTheTop20Projects()
            .then(projects => 
            {
                this.projects = projects;
                // Sets the urlMain
                var ruta = "";
                this.translate.get("UrlMain")
                .toPromise()        
                .then(urlMain => {
                    // Sets the urlProject
                    this.translate.get("UrlProject")
                    .toPromise()        
                    .then(urlProject => {
                        ruta = urlMain + "/" + urlProject + "/" + this.translate.getDefaultLang().toLowerCase();
                        for(var p of projects) {
                            p.urlProjecte = ruta + "/" + p.nom;
                        }
                    })
                })
                .catch(this.handleError);
            }
        );
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
 }
