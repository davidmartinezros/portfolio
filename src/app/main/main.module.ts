import { NgModule } from "@angular/core";
import { TranslateModule } from "@ngx-translate/core";
import { PipesModule } from "../pipes/pipes.module";
import { CommonModule } from "@angular/common";
import { MainRoutingModule } from "./main.rounting.module";
import { MainComponent } from "./main.component";
import { FormComponent } from "../form/form.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AngularFireDatabase } from "angularfire2/database";
import { AuthService } from "../firebase-auth/auth.service";
import { ProjectFirebaseService } from "../projects/project.firebase.service";
import { ProjectsModule } from "../projects/projects.module";
import { ExperienceModule } from "../experience/experience.module";
import { CarouselModule } from "../carousel/carousel.module";
import { KnowledgeModule } from "../knowledge/knowledge.module";
import { LazyLoadImageModule } from 'ng-lazyload-image';

@NgModule({
    declarations: [
      MainComponent,
      FormComponent
    ],
    imports: [
      FormsModule,
      ReactiveFormsModule,
      NgbModule,
      CommonModule,
      PipesModule,
      TranslateModule,
      LazyLoadImageModule,
      MainRoutingModule,
      ProjectsModule,
      ExperienceModule,
      CarouselModule,
      KnowledgeModule
    ],
    providers: [ AuthService, AngularFireDatabase, ProjectFirebaseService ],
    exports: [ MainComponent ],
  })
  
export class MainModule {
  constructor() {
    console.log('MainComponent');
  }
}