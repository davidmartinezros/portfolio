import { Component } from '@angular/core';
import { AuthService } from '../firebase-auth/auth.service';
import { TranslateService } from '@ngx-translate/core';
//import { DashboardContactComponent } from '../dashboard/dashboard-contact.component';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-main',
    templateUrl: '../main/main.component.html',
})

export class MainComponent {
    
<<<<<<< HEAD
    constructor(/*public authService: AuthService,*/
        /*private dashboardContactComponent: DashboardContactComponent*/) { }
=======
    constructor(public authService: AuthService,
        private dashboardContactComponent: DashboardContactComponent) { }
>>>>>>> parent of 9c34457... skip firedatabase for developer in next version
    
}
