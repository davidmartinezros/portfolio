import { isPlatformBrowser, isPlatformServer, Location } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ExperienceComponent } from '../experience/experience.component';
import { HistoryComponent } from '../history/history.component';
import { MainComponent } from '../main/main.component';
import { ProjectsComponent } from '../projects/projects.component';
import { Language } from './language';
import { LanguageService } from './language.service';
import { ThemeComponent } from '../theme/theme.component';
import { ProjectComponent } from '../project/project.component';
import { LanguageComponent } from './language.component';
import { AuthService } from '../firebase-auth/auth.service';

declare var $: any;

@Component({
    selector: 'app-template',
    templateUrl: '../template/template.component.html'
})

export class TemplateComponent {

    languages: Language[];

    ruta: string;

    rutaHistorial: string;

    constructor(@Inject(PLATFORM_ID) private platformId: Object,
        private translate: TranslateService,
        private route: ActivatedRoute,
        private location: Location,
        private router: Router,
        public authService: AuthService,
        private languageService: LanguageService,
        private titleService: Title,
        private metaService: Meta) {

        router.events.subscribe((val) => {
            if(location.path() != ''){
                this.ruta = location.path()
                    .substring(0,
                        location.path().substring(1).indexOf('/')==-1?
                            location.path().length:(location.path().substring(1).indexOf('/') + 1));
            } else {
                this.ruta = 'portfolio-full-stack-developer-software-engineer'
            }
        });

        this.getLanguanges();
    }

    onActivate(event: any) {
        if (isPlatformBrowser(this.platformId)) {
            window.scroll(0,0);
        }
    }

    onClickSection() {
        $('.navbar-collapse').collapse('hide');
    }

    ngOnInit() {
        if (isPlatformBrowser(this.platformId)) {
            // Client only code.
            this.loadLanguage();
        }
        if (isPlatformServer(this.platformId)) {
           // Server only code.
           this.loadServerLanguage();
        }
    }

    loadLanguage() {

        var userLang = "";
        
        this.route.queryParams.subscribe(params => {
            if(!params['lang'] || params['lang'] == "") {
                userLang = LanguageComponent.language;
            } else {
                userLang = params['lang'];
            }

            if(!userLang || userLang == "") {
                userLang = navigator.language;
                if(userLang.startsWith("zh")) {
                    userLang = "zh";
                }
            }

            if(userLang) {
                userLang = userLang.toLowerCase();
            }

            if(userLang && userLang.length > 2) {
                userLang = userLang.substring(0,2);
            }

            if(userLang == "es" || userLang == "en" || userLang == "zh") {
                this.changeLanguage(userLang);
            } else {
                this.changeLanguage("en");
            }
        });
    }

    loadServerLanguage() {

        var userLang = "";
        
        this.route.queryParams.subscribe(params => {
            if(!params['lang'] || params['lang'] == "") {
                userLang = LanguageComponent.language;
            } else {
                userLang = params['lang'];
            }

            if(userLang) {
                userLang = userLang.toLowerCase();
            }

            if(userLang && userLang.length > 2) {
                userLang = userLang.substring(0,2);
            }

            if(userLang == "es" || userLang == "en" || userLang == "zh") {
                this.changeLanguage(userLang);
            } else {
                this.changeLanguage("en");
            }
        });
    }

    public changeServerLanguage(language) {

        console.log(language);

        this.translate.setDefaultLang(language);
        this.translate.use(language);

        LanguageComponent.language = language;

        this.changeMetaTagsSeo();
    }

    public changeLanguage(language) {

        console.log(language);

        this.translate.setDefaultLang(language);
        this.translate.use(language);
    
        LanguageComponent.language = language;

        MainComponent.updateStuff.next(false);
        ProjectsComponent.updateStuff.next(false);
        ProjectComponent.updateStuff.next(false);
        ExperienceComponent.updateStuff.next(false);
        HistoryComponent.updateStuff.next(false);
        ThemeComponent.updateStuff.next(false);
        
        // Sets the rutaHistorial
        this.translate.get("UrlMain")
        .toPromise()        
        .then(urlMain => {
            // Sets the rutaHistorial
            this.translate.get("UrlHistory")
            .toPromise()        
            .then(urlHistory => {
                this.rutaHistorial = "/" + urlMain + "/" + urlHistory;
            })
        })
        .catch(this.handleError);

        this.getLanguanges();

        this.changeMetaTagsSeo();
    }
    
    changeMetaTagsSeo() {
        // Sets the <title></title>
        this.translate.get("TitleIndex")
        .toPromise()        
        .then(title => {
            this.titleService.setTitle(title);
            this.metaService.updateTag({ name: 'og:title', content: title });
            this.metaService.updateTag({ name: 'twitter:title', content: title });
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
        this.translate.get("TagDescriptionIndex")
        .toPromise()        
        .then(description => {
            this.metaService.updateTag({ name: 'description', content: description });
            this.metaService.updateTag({ name: 'og:description', content: description });
            this.metaService.updateTag({ name: 'twitter:description', content: description });
        })
        .catch(this.handleError);

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

    getLanguanges(): void {
        this.languageService.getLanguages()
            .then(languages => this.languages = languages )
            .catch(this.handleError);
    }

    get language() {
        return LanguageComponent.language;
    }
    
    set language(language) {
        LanguageComponent.language = language;
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}
