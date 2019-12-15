import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-themeGroup',
    templateUrl: '../theme/themeGroup.component.html',
 })

 export class ThemeGroupComponent {

    theme: string;
    lang: string;
    private sub: any;
    
    constructor(private route: ActivatedRoute) {

        this.sub = this.route.params.subscribe(params => {
            this.lang = params['lang'];
            this.theme = params['theme'];
            this.theme = this.theme.substr(0,1).toUpperCase() + this.theme.substr(1,this.theme.length);
        });
    }
 }
