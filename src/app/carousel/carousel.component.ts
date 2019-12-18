import { Component } from "@angular/core";
import { Subject } from "rxjs";
import { CarouselService } from "./carousel.service";
import { ProjectService } from "../projects/project.service";
import { Project } from "../projects/project";
import { TranslateService } from "@ngx-translate/core";

@Component({
    selector: 'app-carousel',
    templateUrl: '../carousel/carousel.component.html'
})

export class CarouselComponent {

    images: any[];

    projects: Project[];

    public static updateStuff: Subject<any> = new Subject();

    constructor(private carouselService: CarouselService,
        private projectService: ProjectService,
        private translate: TranslateService) {
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

        this.projectService.getProjects()
            .then(projects =>
            {
                if(projects != null) {
                    this.projects = projects;
                    var ruta = "";
                    var rutaGrup = "";
                    // Sets the urlMain
                    this.translate.get("UrlMain")
                    .toPromise()        
                    .then(urlMain => {
                        // Sets the urlProject
                        this.translate.get("UrlProject")
                        .toPromise()        
                        .then(urlProject => {
                            ruta = "/" + urlMain + "/" + urlProject + "/" + this.translate.getDefaultLang().toLowerCase();
                            for(var p of projects) {
                                p.urlProjecte = ruta + "/" + p.nom;
                            }
                        });
                    })
                    .catch(this.handleError);
                }
            }
        );
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }

}