import { Component } from '@angular/core';
import { Router, Event } from '@angular/router';
import { Location } from '@angular/common';

@Component({
    selector: 'app-footer',
    templateUrl: '../footer/footer.component.html'
})

export class FooterComponent {

    rutaBackToTop: string;

    constructor(private location: Location,
        private router: Router) {
        
    }

    ngOnInit() {
        this.router.events.subscribe((event: Event) => {
            //ruta
            if(this.location.path() != ''){
                this.rutaBackToTop = this.location.path();
            } else {
                this.rutaBackToTop = 'portfolio-full-stack-developer-software-engineer'
            }
        });
    }

}
