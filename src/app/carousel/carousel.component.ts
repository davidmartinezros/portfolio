import { Component } from "@angular/core";
import { Subject } from "rxjs";
import { CarouselService } from "./carousel.service";

declare var PIXI: any; // instead of importing pixi like some tutorials say to do use declare

@Component({
    selector: 'app-carousel',
    templateUrl: '../carousel/carousel.component.html'
})


export class CarouselComponent {

    images: any[];

    public static updateStuff: Subject<any> = new Subject();

    constructor(private carouselService: CarouselService) {
            CarouselComponent.updateStuff.subscribe(res => {
                // here fire functions that fetch the data from the api
                this.getImages();
            });
    }

    ngOnInit(): void {
        this.getImages();
    }

    getImages(): void {
        this.carouselService.getImages()
            .then(images => this.images = images );
    }

}