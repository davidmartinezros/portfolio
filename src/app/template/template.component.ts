import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { Router, Event, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';

declare var $: any;

declare function loadWords(): any;

@Component({
    selector: 'app-template',
    templateUrl: '../template/template.component.html'
})

export class TemplateComponent {

    loaded: boolean;

    constructor(@Inject(PLATFORM_ID) private platformId: Object,
        private router: Router) {
        this.router.events.subscribe((event: Event) => {
            //loading
            if(event instanceof NavigationStart) {
                this.loaded = false;
            }
            else if (
                event instanceof NavigationEnd || 
                event instanceof NavigationCancel ||
                event instanceof NavigationError
                ) {
                this.loaded = true;
            }
        });
    }

    onActivate(event: Event) {
        if (isPlatformBrowser(this.platformId)) {
            window.scroll(0,0);
        }
    }

}
