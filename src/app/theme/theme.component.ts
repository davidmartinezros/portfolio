import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { ProjectContentComponent } from '../project-content/project.content.component';

@Component({
    selector: 'app-theme',
    templateUrl: '../theme/theme.component.html',
 })

 export class ThemeComponent {

    theme: string;
    lang: string;
    private sub: any;

    public static updateStuff: Subject<any> = new Subject();
    
    constructor(private route: ActivatedRoute) {

        this.sub = this.route.params.subscribe(params => {
            this.lang = params['lang'];
            this.theme = params['theme'];
            this.theme = this.theme.substr(0,1).toUpperCase() + this.theme.substr(1,this.theme.length);
        });

        ThemeComponent.updateStuff.subscribe(res => {
            // here fire functions that fetch the data from the api
            this.sub = this.route.params.subscribe(params => {
                this.lang = params['lang'];
                this.theme = params['theme'];
                this.theme = this.theme.substr(0,1).toUpperCase() + this.theme.substr(1,this.theme.length);

                if(this.lang && this.theme) {
                    ProjectContentComponent.updateStuff.next(false);
                }
            });
        });
    }

    changeTheme(theme: string) {
        this.theme = theme;
    }
 }
