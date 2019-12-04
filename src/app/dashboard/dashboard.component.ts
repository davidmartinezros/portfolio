import { Component } from '@angular/core';
import { PLATFORM_ID, APP_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
    selector: 'app-dashboard',
    templateUrl: '../dashboard/dashboard.component.html'
})

export class DashboardComponent {

    constructor(@Inject(PLATFORM_ID) private platformId: Object) {

    }

    onActivate(event: any) {
        if (isPlatformBrowser(this.platformId)) {
            window.scroll(0,0);
        }
    }

}

