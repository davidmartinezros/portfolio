import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs/Subject';
import { Project } from '../projects/project';
import { ProjectService } from '../projects/project.service';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-themeGroup',
    templateUrl: '../theme/themeGroup.component.html',
 })

 export class ThemeGroupComponent {

    technology: string;
    theme: string;
    private sub: any;

    public static updateStuff: Subject<any> = new Subject();
    
    constructor(private route: ActivatedRoute) {
        ThemeGroupComponent.updateStuff.subscribe(res => {
            this.sub = this.route.params.subscribe(params => {
                this.technology = params['technology'];
                this.theme = params['theme'];
                this.technology = this.technology.substr(0,1).toUpperCase() + this.technology.substr(1,this.technology.length);
                this.theme = this.theme.substr(0,1).toUpperCase() + this.theme.substr(1,this.theme.length);
            });
        });
    }

    ngOnInit(): void {
        this.sub = this.route.params.subscribe(params => {
            this.technology = params['technology'];
            this.theme = params['theme'];
            this.technology = this.technology.substr(0,1).toUpperCase() + this.technology.substr(1,this.technology.length);
            this.theme = this.theme.substr(0,1).toUpperCase() + this.theme.substr(1,this.theme.length);
        });
    }
 }
