import { NgModule } from "@angular/core";
import { TranslateModule } from "@ngx-translate/core";
import { PipesModule } from "../pipes/pipes.module";
import { CommonModule } from "@angular/common";
import { LazyLoadImageModule, LoadImageProps } from 'ng-lazyload-image';
import { MainRoutingModule } from "./main.rounting.module";
import { MainComponent } from "./main.component";
import { KnowledgeService } from "./knowledge.service";
import { CarouselComponent } from "../carousel/carousel.component";
import { BarRatingModule } from "ngx-bar-rating";
import { ExperienceComponent } from "../experience/experience.component";
import { ProjectsComponent } from "../projects/projects.component";
import { FormComponent } from "../form/form.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AngularFireDatabase } from "angularfire2/database";
import { AuthService } from "../firebase-auth/auth.service";
import { CarouselService } from "../carousel/carousel.service";
import { ExperienceService } from "../experience/experience.service";
import { ProjectService } from "../projects/project.service";

@NgModule({
    declarations: [
      MainComponent,
      CarouselComponent,
      ExperienceComponent,
      ProjectsComponent,
      FormComponent
    ],
    imports: [
      FormsModule,
      ReactiveFormsModule,
      NgbModule,
      CommonModule,
      PipesModule,
      TranslateModule,
      LazyLoadImageModule.forRoot({ loadImage }),
      MainRoutingModule,
      BarRatingModule
    ],
    providers: [ KnowledgeService, AuthService, AngularFireDatabase, CarouselService, ExperienceService, ProjectService ],
    exports: [ MainComponent ],
  })
  
  export class MainModule {
    constructor() {
      console.log('MainComponent');
    }
  }

  export function loadImage({ imagePath }: LoadImageProps) {
    return [imagePath];
  }