import { ViewChild, Component, ElementRef } from "@angular/core";

declare var PIXI: any; // instead of importing pixi like some tutorials say to do use declare

@Component({
    selector: 'app-image',
    templateUrl: '../image/image.component.html'
})


export class ImageComponent {

    @ViewChild('pixiContainer', {static: false}) pixiContainer: ElementRef; // this allows us to reference and load stuff into the div container

    public pApp: any; // this will be our pixi application

    ngAfterViewInit() {

        this.pApp = new PIXI.Application({ width: 280, height: 521 }); // this creates our pixi application

        this.pApp.view.border = "1px solid white";

        this.pixiContainer.nativeElement.appendChild(this.pApp.view); // this places our pixi application onto the viewable document

        let img = new PIXI.Sprite.from("assets/images/foto.png");
        img.width = 280;
        img.height = 521;
        this.pApp.stage.addChild(img);

        let depthMap = new PIXI.Sprite.from("assets/images/foto-map.png");
        this.pApp.stage.addChild(depthMap);
                
        let displacementFilter = new PIXI.filters.DisplacementFilter(depthMap);
        this.pApp.stage.filters = [displacementFilter];

        window.onmousemove = function(e) {
            displacementFilter.scale.x = (window.innerWidth / 2 - e.clientX) /20;
            displacementFilter.scale.y = (window.innerHeight / 2 - e.clientY) /20;
        };

    }

}