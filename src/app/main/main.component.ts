import { Component } from '@angular/core';
import { AuthService } from '../firebase-auth/auth.service';
import { TranslateService } from '@ngx-translate/core';
import { DashboardContactComponent } from '../dashboard/dashboard-contact.component';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-main',
    templateUrl: '../main/main.component.html',
})

export class MainComponent {
    
    constructor(public authService: AuthService,
        private dashboardContactComponent: DashboardContactComponent) { }
    
}
