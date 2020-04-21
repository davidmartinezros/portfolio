import { Component, Inject, PLATFORM_ID, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Project } from '../projects/project';
import { Subject } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { ProjectFirebaseService } from '../projects/project.firebase.service';

declare function createCookie(name, value, days): any;

declare function readCookie(name): any;

declare function eraseCookie(name): any;

@Component({
    selector: 'app-project-content',
    templateUrl: '../project-content/project.content.component.html',
 })

 export class ProjectContentComponent {

    @Input() project: Project;

    demo: string;
    git: string;
    detall: string;
    grup: string;
    meGustas: string;

    public static updateStuff: Subject<any> = new Subject();
    
    constructor(@Inject(PLATFORM_ID) private platformId: Object,
                private translate: TranslateService,
                private projectFirebaseService: ProjectFirebaseService) {
        ProjectContentComponent.updateStuff.subscribe(res => {
            this.getTextLinks();
        });
    }
      
    ngOnInit(): void {
        this.getTextLinks();
    }

    getProjectStyle() {
        let style = "";
        if(this.project.tema == "Angular") {
            style = "ribbon ribbon-angular";
        } else if(this.project.tema == "Reactjs") {
            style = "ribbon ribbon-reactjs";
        } else if(this.project.tema == "Ionic") {
            style = "ribbon ribbon-ionic";
        } else if(this.project.tema == "Java") {
            style = "ribbon ribbon-java";
        } else if(this.project.tema == "Unity") {
            style = "ribbon ribbon-unity";
        } else if(this.project.tema == "Google Trends") {
            style = "ribbon ribbon-googletrends";
        } else if(this.project.tema == "Javascript") {
            style = "ribbon ribbon-javascript";
        }
        return style;
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
            } else {
                createCookie(key, 'voted', 365);
                project.estaVotat = true;
                project.styleLike = "styleLikeOrange meGustasLink";
                project.likes++;
                this.projectFirebaseService.updateProject(project.id, project.likes);
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

 }
