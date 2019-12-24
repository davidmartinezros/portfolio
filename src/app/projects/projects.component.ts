import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs/Subject';
import { Project } from './project';
import { ProjectService } from './project.service';
import { isPlatformBrowser } from '@angular/common';

declare function reloadYoutube(): any;

@Component({
    selector: 'app-projects',
    templateUrl: '../projects/projects.component.html',
 })

 export class ProjectsComponent {

    projects: Project[];

    demo: string;
    git: string;
    detall: string;
    grup: string;

    public static updateStuff: Subject<any> = new Subject();

    constructor(
        @Inject(PLATFORM_ID) private platformId: Object,
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

    ngAfterContentInit(): void {
        if (isPlatformBrowser(this.platformId)) {
            reloadYoutube();
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
        );
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
 }
