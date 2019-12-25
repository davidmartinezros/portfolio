import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Project } from '../projects/project';
import { ProjectService } from '../projects/project.service';
import { Subject } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { ProjectFirebaseService } from '../projects/project.firebase.service';

declare function reloadYoutube(): any;

declare function createCookie(name, value, days): any;

declare function readCookie(name): any;

declare function eraseCookie(name): any;

@Component({
    selector: 'app-project',
    templateUrl: '../project/project.component.html',
 })

 export class ProjectComponent {

    private id: number;
    private nom: string;
    private lang: string;
    private sub: any;
    project: Project;

    demo: string;
    git: string;
    grup: string;
    meGustas: string;

    public static updateStuff: Subject<any> = new Subject();
    
    constructor(@Inject(PLATFORM_ID) private platformId: Object,
                private route: ActivatedRoute,
                private projectService: ProjectService,
                private translate: TranslateService,
                private titleService: Title,
                private metaService: Meta,
                private projectFirebaseService: ProjectFirebaseService) {
        ProjectComponent.updateStuff.subscribe(res => {
            this.sub = this.route.params.subscribe(params => {
                this.lang = params['lang'];
                this.nom = params['nom'];
    
                if(this.nom) {
                    this.getProject();
                }
            });
        });
    }
      
    ngOnInit(): void {
        this.sub = this.route.params.subscribe(params => {
            this.lang = params['lang'];
            this.nom = params['nom'];

            if(this.nom) {
                this.getProjectWithLang();
            }
        });
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
                project.styleLike = "styleLikeWhite";
                project.likes--;
                this.projectFirebaseService.updateProject(project.id, project.likes);
                //console.log("white");
            } else {
                createCookie(key, 'voted', 365);
                project.estaVotat = true;
                project.styleLike = "styleLikeOrange";
                project.likes++;
                this.projectFirebaseService.updateProject(project.id, project.likes);
                //console.log("orange");
            }
        }
    }

    getProject() {
        this.projectService.getProjectById(this.id)
            .then(project => { 
                this.project = project;
                // Sets the urlMain
                var rutaGrup = "";
                this.translate.get("UrlMain")
                .toPromise()        
                .then(urlMain => {
                    this.translate.get("UrlGroup")
                    .toPromise()        
                    .then(urlGroup => {
                        this.translate.get("UrlTechnology")
                        .toPromise()        
                        .then(urlTechnology => {
                            this.getProjectLikes(project);
                            this.loadProjectStyle(project);
                            rutaGrup = urlMain + "/" + urlGroup + "/" + urlTechnology + "/" + this.translate.getDefaultLang().toLowerCase();
                            project.urlGrup = rutaGrup + "/" + project.tema.toLowerCase();
                        });
                    })
                })
                .catch(this.handleError);
                this.getTextLinks();
                this.changeGoogleSearchItems();
            }
        );
    }

    getProjectWithLang() {
        this.projectService.getProjectByNameWithLang(this.lang, this.nom)
            .then(project => { 
                this.project = project;
                this.id = project.id;
                // Sets the urlMain
                var rutaGrup = "";
                this.translate.get("UrlMain")
                .toPromise()        
                .then(urlMain => {
                    this.translate.get("UrlGroup")
                    .toPromise()        
                    .then(urlGroup => {
                        this.translate.get("UrlTechnology")
                        .toPromise()        
                        .then(urlTechnology => {
                            this.getProjectLikes(project);
                            this.loadProjectStyle(project);
                            rutaGrup = "/" + urlMain + "/" + urlGroup + "/" + urlTechnology + "/" + this.translate.getDefaultLang().toLowerCase();
                            project.urlGrup = rutaGrup + "/" + project.tema.toLowerCase();
                        });
                    })
                })
                .catch(this.handleError);
                this.getTextLinks();
                this.changeGoogleSearchItems();
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
                project.styleLike = "styleLikeOrange";
            } else {
                project.estaVotat = true;
                project.styleLike = "styleLikeWhite";
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

    private changeGoogleSearchItems() {
        if(this.project) {

            // Sets the <title></title>
            this.translate.get("SubtitleIndex")
            .toPromise()        
            .then(subtitle => {
                this.titleService.setTitle(this.project.titol + subtitle);
                this.metaService.updateTag({ name: 'og:title', content: this.project.titol + subtitle });
                this.metaService.updateTag({ name: 'twitter:title', content: this.project.titol + subtitle });
            })
            .catch(this.handleError);

            // Sets the <meta> tag author
            this.translate.get("TagAuthorIndex")
            .toPromise()        
            .then(author => this.metaService.updateTag({ name: 'author', content: author }))
            .catch(this.handleError);

            // Sets the <meta> tag keywords
            this.translate.get("TagKeywordsIndex")
            .toPromise()        
            .then(keywords => this.metaService.updateTag({ name: 'keywords', content: keywords }))
            .catch(this.handleError);

            // Sets the <meta> tag description
            this.metaService.updateTag({ name: 'description', content: this.project.html });
            this.metaService.updateTag({ name: 'og:description', content: this.project.html });
            this.metaService.updateTag({ name: 'twitter:description', content: this.project.html });

            // Sets the <meta> tag image
            this.translate.get("TagImageIndex")
            .toPromise()        
            .then(image => {
                this.metaService.updateTag({ name: 'image', content: image });
                this.metaService.updateTag({ name: 'og:image', content: image });
                this.metaService.updateTag({ name: 'twitter:image', content: image });
            })
            .catch(this.handleError);

            this.metaService.updateTag({ name: 'og:type', content: 'website' });
            this.metaService.updateTag({ name: 'og:url', content: 'https://davidmartinezros.com' });
            this.metaService.updateTag({ name: 'twitter:card', content: 'summary' });
        }
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }

 }
