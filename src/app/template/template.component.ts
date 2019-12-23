import { isPlatformBrowser, isPlatformServer, Location } from '@angular/common';
import { Component, Inject, PLATFORM_ID, APP_ID } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ExperienceComponent } from '../experience/experience.component';
import { AuthService } from '../firebase-auth/auth.service';
import { HistoryComponent } from '../history/history.component';
import { MainComponent } from '../main/main.component';
import { ProjectsComponent } from '../projects/projects.component';
import { Language } from './language';
import { LanguageService } from './language.service';
import { ThemeComponent } from '../theme/theme.component';
import { ProjectComponent } from '../project/project.component';
import { LanguageComponent } from './language.component';
import { CarouselComponent } from '../carousel/carousel.component';

@Component({
    selector: 'app-template',
    templateUrl: '../template/template.component.html'
})

export class TemplateComponent {

    languages: Language[];

    loaded: boolean = false;

    playing: boolean = false;

    sound: any;

    ruta: string;

    rutaHistorial: string;

    borderColorMusic: string ='rgba(255,255,255,.1)';

    constructor(@Inject(PLATFORM_ID) private platformId: Object,
        public authService: AuthService,
        private translate: TranslateService,
        private route: ActivatedRoute,
        private location: Location,
        private router: Router,
        private languageService: LanguageService,
        private titleService: Title,
        private metaService: Meta) {

        router.events.subscribe((val) => {
            if(location.path() != ''){
                this.ruta = location.path().substring(0,location.path().substring(1).indexOf('/') + 1);
            } else {
                this.ruta = 'full-stack-developer-software-engineer'
            }
        });

        this.getLanguanges();
    }

    onActivate(event: any) {
        if (isPlatformBrowser(this.platformId)) {
            window.scroll(0,0);
        }
    }

    onClickSection(section) {
        this.router.navigate([this.ruta], {fragment: section});
    }

    ngOnInit() {
        if (isPlatformBrowser(this.platformId)) {
            // Client only code.
            this.loadLanguage();
            //this.loadMusic();
         }
         if (isPlatformServer(this.platformId)) {
           // Server only code.
           this.loadServerLanguage();
         }
    }

    loadLanguage() {
        var userLang = "";

        //console.log(this.route);

        //console.log(this.route.queryParams);
        
        this.route.queryParams.subscribe(params => {
            if(!params['lang'] || params['lang'] == "") {
                userLang = LanguageComponent.language;
            } else {
                userLang = params['lang'];
            }

            console.log("queryParams:" + userLang);

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

            console.log('complete loadLanguage');

        });
    }

    loadServerLanguage() {
        var userLang = "";

        //console.log(this.route);

        //console.log(this.route.queryParams);
        
        this.route.queryParams.subscribe(params => {
            if(!params['lang'] || params['lang'] == "") {
                userLang = LanguageComponent.language;
            } else {
                userLang = params['lang'];
            }

            console.log("queryParams:" + userLang);

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

            console.log('complete loadLanguage');

        });
    }

    isLoadedTrack() {
        return !this.sound ||this.loaded;
    }

    isPlayingTrack() {
        return this.playing;
    }

    playTrack() {
        if(this.sound) {
            this.sound.play();
            this.borderColorMusic='var(--second-color)';
        } else {
            this.loadMusic();
            this.sound.play();
            this.borderColorMusic='var(--second-color)';
        }
    }

    pauseTrack() {
        if(this.sound) {
            this.sound.pause();
            this.borderColorMusic='rgba(255,255,255,.1)';
        }
    }

    loadMusic() {
        this.sound = new Audio();
        this.sound.autoplay = false;
        this.sound.preload = 'auto';
        this.sound.autobuffer = true;

        let parent = this;

        this.sound.addEventListener('loadeddata', function() {
            parent.loaded = true;
        }, false);

        this.sound.addEventListener('play', function() {
            parent.playing = true;
        }, false);

        this.sound.addEventListener('pause', function() {
            parent.playing = false;
        }, false);
        
        this.sound.src = './assets/audio/song.mp3';
        this.sound.load();
    }

    public changeServerLanguage(language) {

        console.log(language);

        // this language will be used as a fallback when a translation isn't found in the current language
        this.translate.setDefaultLang(language);

        // the lang to use, if the lang isn't available, it will use the current loader to get them
        this.translate.use(language);

        LanguageComponent.language = language;

        this.changeMetaTagsSeo();

        console.log('changeServerLanguage');
        
    }

    public changeLanguage(language) {

        console.log(language);
    
        // this language will be used as a fallback when a translation isn't found in the current language
        this.translate.setDefaultLang(language);
        
        // the lang tLanguageComponento use, if the lang isn't available, it will use the current loader to get them
        this.translate.use(language);
    
        LanguageComponent.language = language;

        MainComponent.updateStuff.next(false);
        ProjectsComponent.updateStuff.next(false);
        ProjectComponent.updateStuff.next(false);
        ExperienceComponent.updateStuff.next(false);
        HistoryComponent.updateStuff.next(false);
        ThemeComponent.updateStuff.next(false);
        CarouselComponent.updateStuff.next(false);
        
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
            .then(languages => 
            { this.languages = languages }
        );
    }

    get language() {
        return LanguageComponent.language;
      }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}
