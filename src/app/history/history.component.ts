import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs/Subject';
import { Project } from '../projects/project';
import { ProjectService } from '../projects/project.service';
import { isPlatformBrowser } from '@angular/common';
import { ProjectFirebaseService } from '../projects/project.firebase.service';

declare function reloadYoutube(): any;

declare function createCookie(name, value, days): any;

declare function readCookie(name): any;

declare function eraseCookie(name): any;

@Component({
    selector: 'app-history',
    templateUrl: '../history/history.component.html',
 })

 export class HistoryComponent {

    projects: Project[];

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
            HistoryComponent.updateStuff.subscribe(res => {
                // here fire functions that fetch the data from the api
                this.getProjects();
                this.getTextLinks();
            });
    }
      
    ngOnInit(): void {
        this.getProjects();
        this.getTextLinks();
    }

    ngAfterContentInit(): void {
        if (isPlatformBrowser(this.platformId)) {
            reloadYoutube();
        }
    }

    likeDislikeProject(project) {
        if (isPlatformBrowser(this.platformId)) {
            let key = "projectsLikes." + project.id;
            if(readCookie(key)) {
                eraseCookie(key);
                project.estaVotat = false;
                project.styleLike = "styleLikeWhite meGustasLink";
                project.likes--;
                this.projectFirebaseService.updateProject(project.id, project.likes);
                //console.log("white");
            } else {
                createCookie(key, 'voted', 365);
                project.estaVotat = true;
                project.styleLike = "styleLikeOrange meGustasLink";
                project.likes++;
                this.projectFirebaseService.updateProject(project.id, project.likes);
                //console.log("orange");
            }
        }
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
        this.translate.get("TextGrup")
            .toPromise()        
            .then(grup => {
                this.grup = grup;
            }
        );
        this.translate.get("TextMeGustas")
            .toPromise()        
            .then(meGustas => {
                this.meGustas = meGustas;
            }
        );
    }

    getProjects(): void {
        this.projectService.getProjects()
            .then(projects => 
            {
                if(projects != null) {
                    this.projects = projects;
                    // Sets the urlMain
                    var ruta = "";
                    var rutaGrup = "";
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
                        })
                    })
                    .catch(this.handleError);
                }
            }
        );
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
