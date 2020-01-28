import { Component, Inject, PLATFORM_ID, ChangeDetectorRef } from '@angular/core';
import { Router, Event, NavigationStart, NavigationEnd, NavigationCancel, NavigationError, RouterOutlet } from '@angular/router';
import { trigger, transition, style, animate, query, animateChild, group } from '@angular/animations';

@Component({
    selector: 'app-template',
    templateUrl: '../template/template.component.html',
    animations: [
    trigger('routeAnimations', [
        transition('MainPage => ProjectPage, MainPage => ThemePage, ProjectPage <=> ThemePage, HistoryPage => ProjectPage, HistoryPage => ThemePage', [
        style({ position: 'relative' }),
        query(':enter, :leave', [
            style({
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%'
            })
        ]),
        query(':enter', [
            style({ left: '-100%'})
        ]),
        query(':leave', animateChild()),
            group([
                query(':leave', [
                    animate('1500ms ease-out', style({ left: '100%'}))
                ]),
                query(':enter', [
                    animate('1500ms ease-out', style({ left: '0%'}))
                ])
            ]),
            query(':enter', animateChild()),
            ])
        ])
    ]
})

export class TemplateComponent {

    loaded: boolean = false;

    langLoaded: boolean = false;

    constructor(@Inject(PLATFORM_ID) private platformId: Object,
        private router: Router,
        private cdRef : ChangeDetectorRef) {

    }

    ngOnInit() {
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

    ngAfterViewChecked() {
        this.cdRef.detectChanges();
    }

    setLangLoaded(langLoaded) {
        this.langLoaded = langLoaded;
    }

    getAnimationData(outlet: RouterOutlet) {
        return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
    }

}
