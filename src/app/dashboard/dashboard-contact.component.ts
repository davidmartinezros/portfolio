import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
    selector: 'app-dashboard-contact',
    templateUrl: '../dashboard/dashboard-contact.component.html'
})

export class DashboardContactComponent {

    messages$;

    constructor(private af: AngularFireDatabase) {
        
        this.messages$ = this.af.list('messages', ref => ref.limitToFirst(100)).valueChanges();
    }
}
