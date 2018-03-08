import { Component, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../firebase-auth/auth.service';
import { TranslateService } from '@ngx-translate/core';
import { ProjectsComponent } from '../projects/projects.component';
import { ExperienceComponent } from '../experience/experience.component';
import { LanguageService } from './language.service';
import { Pipe } from '@angular/core';
import { Language } from './language';

@Component({
    selector: 'app-template',
    templateUrl: '../template/template.component.html'
})

export class TemplateComponent {

    languages: Language[];

    language;

    loaded: boolean = false;

    playing: boolean = false;

    sound: HTMLAudioElement;

    constructor(public authService: AuthService,
        private translate: TranslateService,
        private route: ActivatedRoute,
        private languageService: LanguageService) {
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
        let parent = this;

        this.sound.addEventListener('loadeddata', function() {
            parent.loaded = true;
            parent.playTrack();
        }, false);
        
        this.sound.src = './assets/audio/Rhodesia_MkII.mp3';

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
            this.playing = true;
        }
    }

    pauseTrack() {
        if(this.sound) {
            this.sound.pause();
            this.playing = false;
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
        
    }

    getLanguanges(): void {
        this.languageService.getLanguages()
            .then(languages => 
            { this.languages = languages }
        );
    }
}
