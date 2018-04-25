import { Component, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../firebase-auth/auth.service';
import { TranslateService } from '@ngx-translate/core';
import { ProjectsComponent } from '../projects/projects.component';
import { ExperienceComponent } from '../experience/experience.component';
import { LanguageService } from './language.service';
import { Pipe } from '@angular/core';
import { Language } from './language';
import { Title, Meta } from '@angular/platform-browser';

@Component({
    selector: 'app-template',
    templateUrl: '../template/template.component.html'
})

export class TemplateComponent {

    languages: Language[];

    language;

    loaded: boolean = false;

    playing: boolean = false;

    sound: any;

    constructor(public authService: AuthService,
        private translate: TranslateService,
        private route: ActivatedRoute,
        private languageService: LanguageService,
        private titleService: Title,
        private metaService: Meta) {

        var userLang = "";
        this.route.queryParams.subscribe(params => {
            if(!params['lang'] || params['lang'] == "") {
                userLang = this.language;
            } else {
                userLang = params['lang'];
            }

            //console.log("queryParams:" + userLang);

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
        /*
        let template = this;
        this.sound = new Howl({
            src: ['./assets/audio/Rhodesia_MkII.mp3'],
            autoplay: true,
            loop: true,
            volume: 0.3,
            html5 :true,
            mobileAutoEnable: true
        });
        */
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
        
        this.sound.src = './assets/audio/Rhodesia_MkII.mp3';
        this.sound.load();
    }

    ngOnInit() {
        this.getLanguanges();
    }

    isLoadedTrack() {
        return this.loaded;
    }

    isPlayingTrack() {
        return this.playing;
    }

    playTrack() {
        if(this.sound) {
            this.sound.play();
        }
    }

    pauseTrack() {
        if(this.sound) {
            this.sound.pause();
        }
    }

    public changeLanguage(language) {

        console.log(language);
    
        // this language will be used as a fallback when a translation isn't found in the current language
        this.translate.setDefaultLang(language);
        
        // the lang to use, if the lang isn't available, it will use the current loader to get them
        this.translate.use(language);
    
        this.language = language;

        ProjectsComponent.updateStuff.next(false);
        ExperienceComponent.updateStuff.next(false);
        this.getLanguanges();

        let title = "";

        // Sets the <title></title>
        this.translate.get("TitleIndex")
            .toPromise()        
            .then(title => this.titleService.setTitle(title))
            .catch(this.handleError);

        // Sets the <meta> tag author
        this.translate.get("TagAuthorIndex")
            .toPromise()        
            .then(author => this.metaService.addTag({ name: 'author', content: author }))
            .catch(this.handleError);
        
        // Sets the <meta> tag keywords
        this.translate.get("TagKeywordsIndex")
            .toPromise()        
            .then(keywords => this.metaService.addTag({ name: 'keywords', content: keywords }))
            .catch(this.handleError);

        // Sets the <meta> tag description
        this.translate.get("TagDescriptionIndex")
            .toPromise()        
            .then(description => this.metaService.addTag({ name: 'description', content: description }))
            .catch(this.handleError);
        
    }

    getLanguanges(): void {
        this.languageService.getLanguages()
            .then(languages => 
            { this.languages = languages }
        );
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}
