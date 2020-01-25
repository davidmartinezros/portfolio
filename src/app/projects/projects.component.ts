import { Component, Inject, EventEmitter, PLATFORM_ID, Input, Output } from '@angular/core';
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

    @Input() filter: string;
    @Input() showAll: boolean;
    @Input() showBest20: boolean;
    @Output() theme = new EventEmitter<string>();

    isAll = true;
    isBest20 = false;
    isAngular = false;
    isJava = false;
    isJavascript = false;
    isUnity = false;
    isGoogleTrends = false;

    projects: Project[];

    public static updateStuff: Subject<any> = new Subject();

    constructor(
        @Inject(PLATFORM_ID) private platformId: Object,
        private projectService: ProjectService,
        private translate: TranslateService,
        private projectFirebaseService: ProjectFirebaseService) {
            ProjectsComponent.updateStuff.subscribe(res => {
                // here fire functions that fetch the data from the api
                //this.getProjects();
                this.initOption(this.filter);
                ProjectContentComponent.updateStuff.next(false);
            });
    }
      
    ngOnInit(): void {
        this.initOption(this.filter);
    }

    ngAfterContentInit(): void {
        if (isPlatformBrowser(this.platformId)) {
            reloadYoutube();
        }
    }

    selectOption(filter) {
        this.theme.emit(filter);
        this.initOption(filter);
    }

    initOption(filter) {
        this.filter = filter;
        if(filter == 'All') {
            this.isAll = true;
            this.isBest20 = false;
            this.isAngular = false;
            this.isJava = false;
            this.isJavascript = false;
            this.isUnity = false;
            this.isGoogleTrends = false;
        } else if(filter == 'Best20') {
            this.isAll = false;
            this.isBest20 = true;
            this.isAngular = false;
            this.isJava = false;
            this.isJavascript = false;
            this.isUnity = false;
            this.isGoogleTrends = false;
        } else if(filter == 'Angular') {
            this.isAll = false;
            this.isBest20 = false;
            this.isAngular = true;
            this.isJava = false;
            this.isJavascript = false;
            this.isUnity = false;
            this.isGoogleTrends = false;
        } else if(filter == 'Java') {
            this.isAll = false;
            this.isBest20 = false;
            this.isAngular = false;
            this.isJava = true;
            this.isJavascript = false;
            this.isUnity = false;
            this.isGoogleTrends = false;
        } else if(filter == 'Javascript') {
            this.isAll = false;
            this.isBest20 = false;
            this.isAngular = false;
            this.isJava = false;
            this.isJavascript = true;
            this.isUnity = false;
            this.isGoogleTrends = false;
        } else if(filter == 'Unity') {
            this.isAll = false;
            this.isBest20 = false;
            this.isAngular = false;
            this.isJava = false;
            this.isJavascript = false;
            this.isUnity = true;
            this.isGoogleTrends = false;
        } else if(filter == 'Google trends') {
            this.isAll = false;
            this.isBest20 = false;
            this.isAngular = false;
            this.isJava = false;
            this.isJavascript = false;
            this.isUnity = false;
            this.isGoogleTrends = true;
        }
        this.projectService.getFilteredProjects(filter)
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

    getStyle(filter) {
        if(filter == 'All') {
            return this.isAll ? "activeGroup": "linkGroup";
        } else if(filter == 'Best20') {
            return this.isBest20 ? "activeGroup": "linkGroup";
        } else if(filter == 'Angular') {
            return this.isAngular ? "activeGroup": "linkGroup";
        } else if(filter == 'Java') {
            return this.isJava ? "activeGroup": "linkGroup";
        } else if(filter == 'Javascript') {
            return this.isJavascript ? "activeGroup": "linkGroup";
        } else if(filter == 'Unity') {
            return this.isUnity ? "activeGroup": "linkGroup";
        } else if(filter == 'Google trends') {
            return this.isGoogleTrends ? "activeGroup": "linkGroup";
        }
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
                project.styleLike = "styleLikeOrange meGustasLink";
            } else {
                project.estaVotat = true;
                project.styleLike = "styleLikeWhite meGustasLink";
            }
        }
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
 }
