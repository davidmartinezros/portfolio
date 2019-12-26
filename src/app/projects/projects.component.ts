import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs/Subject';
import { Project } from './project';
import { ProjectService } from './project.service';
import { isPlatformBrowser } from '@angular/common';
import { ProjectFirebaseService } from './project.firebase.service';
import { ProjectContentComponent } from '../project-content/project.content.component';

declare function reloadYoutube(): any;

declare function readCookie(name): any;

@Component({
    selector: 'app-projects',
    templateUrl: '../projects/projects.component.html',
 })

 export class ProjectsComponent {

    projects: Project[];

    evaluatingProject: Project;

    demo: string;
    git: string;
    detall: string;
    grup: string;
    meGustas: string;

    public static updateStuff: Subject<any> = new Subject();

    constructor(
        @Inject(PLATFORM_ID) private platformId: Object,
        private projectService: ProjectService,
        private translate: TranslateService,
        private projectFirebaseService: ProjectFirebaseService) {
            ProjectsComponent.updateStuff.subscribe(res => {
                // here fire functions that fetch the data from the api
                this.getProjects();
                ProjectContentComponent.updateStuff.next(false);
            });
    }
      
    ngOnInit(): void {
        this.getProjects();
    }

    ngAfterContentInit(): void {
        if (isPlatformBrowser(this.platformId)) {
            reloadYoutube();
        }
    }

    getProjects(): void {
        this.projectService.getTheTop20Projects()
            .then(projects => 
            {
                if(projects != null) {
                    this.projects = projects;
                    var ruta = "";
                    var rutaGrup = "";
                    // Sets the urlMain
                    this.translate.get("UrlMain")
                    .toPromise()        
                    .then(urlMain => {
                        // Sets the urlProject
                        this.translate.get("UrlProject")
                        .toPromise()        
                        .then(urlProject => {
                            this.translate.get("UrlGroup")
                            .toPromise()        
                            .then(urlGroup => {
                                this.translate.get("UrlTechnology")
                                .toPromise()        
                                .then(urlTechnology => {
                                    ruta = "/" + urlMain + "/" + urlProject + "/" + this.translate.getDefaultLang().toLowerCase();
                                    rutaGrup = "/" + urlMain + "/" + urlGroup + "/" + urlTechnology + "/" + this.translate.getDefaultLang().toLowerCase();
                                    for(var p of projects) {
                                        this.getProjectLikes(p);
                                        this.loadProjectStyle(p);
                                        p.urlProjecte = ruta + "/" + p.nom;
                                        p.urlGrup = rutaGrup + "/" + p.tema.toLowerCase();
                                    }
                                });
                            });
                        });
                    })
                    .catch(this.handleError);
                }
            }
        )
    }

    getProjectLikes(project) {
        return this.projectFirebaseService.getProject(project.id)
        .valueChanges()
        .subscribe(
            likes => {
                if (likes) {
                    project.likes = likes;
                } else {
                    project.likes = 0;
                }
        });
    }

    loadProjectStyle(project) {
        if (isPlatformBrowser(this.platformId)) {
            let key = "projectsLikes." + project.id;
            if(readCookie(key)) {
                project.estaVotat = true;
                project.styleLike = "styleLikeOrange";
            } else {
                project.estaVotat = true;
                project.styleLike = "styleLikeWhite";
            }
        }
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
 }
