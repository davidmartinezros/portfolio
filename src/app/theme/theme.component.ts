import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs/Subject';
import { Project } from '../projects/project';
import { ProjectService } from '../projects/project.service';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { ProjectFirebaseService } from '../projects/project.firebase.service';

declare function reloadYoutube(): any;

declare function createCookie(name, value, days): any;

declare function readCookie(name): any;

declare function eraseCookie(name): any;

@Component({
    selector: 'app-theme',
    templateUrl: '../theme/theme.component.html',
 })

 export class ThemeComponent {

    private technology: string;
    private theme: string;
    private lang: string;
    private sub: any;

    demo: string;
    git: string;
    detall: string;
    meGustas: string;

    projects: Project[];

    public static updateStuff: Subject<any> = new Subject();

    constructor(
        @Inject(PLATFORM_ID) private platformId: Object,
        private route: ActivatedRoute,
        private projectService: ProjectService,
        private translate: TranslateService,
        private titleService: Title,
        private metaService: Meta,
        private projectFirebaseService: ProjectFirebaseService) {

            ThemeComponent.updateStuff.subscribe(res => {
                // here fire functions that fetch the data from the api
                this.sub = this.route.params.subscribe(params => {
                    this.lang = params['lang'];
                    this.technology = params['technology'];
                    this.theme = params['theme'];
                    this.technology = this.technology.substr(0,1).toUpperCase() + this.technology.substr(1,this.technology.length);
                    this.theme = this.theme.substr(0,1).toUpperCase() + this.theme.substr(1,this.theme.length);
        
                    if(this.lang && this.theme) {
                        this.getProjects();
                    }
                });
            });
    }
      
    ngOnInit(): void {
        this.sub = this.route.params.subscribe(params => {
            this.lang = params['lang'];
            this.technology = params['technology'];
            this.theme = params['theme'];
            this.technology = this.technology.substr(0,1).toUpperCase() + this.technology.substr(1,this.technology.length);
            this.theme = this.theme.substr(0,1).toUpperCase() + this.theme.substr(1,this.theme.length);

            if(this.lang && this.theme) {
                this.getProjectsWithLang();
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

    getProjects(): void {
        this.projectService.getProjectsByTheme(this.theme)
            .then(projects => {
                if(projects != null) {
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
                                this.getProjectLikes(p);
                                this.loadProjectStyle(p);
                                p.urlProjecte = ruta + "/" + p.nom;
                            }
                            this.getTextLinks();
                            this.changeGoogleSearchItems();
                        })
                    })
                    .catch(this.handleError);
                }
            }
        );
    }

    getProjectsWithLang(): void {
        this.projectService.getProjectsByThemeWithLang(this.lang, this.theme)
            .then(projects => {
                if(projects != null) {
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
                            ruta = "/" + urlMain + "/" + urlProject + "/" + this.translate.getDefaultLang().toLowerCase();
                            for(var p of projects) {
                                this.getProjectLikes(p);
                                this.loadProjectStyle(p);
                                p.urlProjecte = ruta + "/" + p.nom;
                            }
                            this.getTextLinks();
                            this.changeGoogleSearchItems();
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
        this.translate.get("TextDetall")
            .toPromise()        
            .then(detall => {
                this.detall = detall;
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
        if(this.theme) {

            // Sets the <title></title>
            this.translate.get("SubtitleIndex")
            .toPromise()        
            .then(subtitle => {
                this.titleService.setTitle(this.technology + " : " + this.theme + subtitle);
                this.metaService.updateTag({ name: 'og:title', content: this.technology + " : " + this.theme + subtitle });
                this.metaService.updateTag({ name: 'twitter:title', content: this.technology + " : " + this.theme + subtitle });
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

            this.translate.get("TagDescriptionIndex")
            .toPromise()        
            .then(description => {
                this.metaService.updateTag({ name: 'description', content: description });
                this.metaService.updateTag({ name: 'og:description', content: description });
                this.metaService.updateTag({ name: 'twitter:description', content: description });
            })
            .catch(this.handleError);
            // Sets the <meta> tag description
            
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
