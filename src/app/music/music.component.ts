import { Component } from '@angular/core';

@Component({
    selector: 'app-music',
    templateUrl: '../music/music.component.html',
 })

 export class MusicComponent {
    
    playing: boolean = false;

    sound: any;

    loaded: boolean = false;

    borderColorMusic: string ='rgba(255,255,255,.1)';

    constructor() {

    }
     
    isLoadedTrack() {
        return !this.sound || this.loaded;
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
 }
