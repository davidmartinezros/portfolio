import { NgModule } from "@angular/core";
import { TranslateModule } from "@ngx-translate/core";
import { PipesModule } from "../pipes/pipes.module";
import { CommonModule } from "@angular/common";
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { ProjectComponent } from "./project.component";
import { ProjectRoutingModule } from "./project.rounting.module";
import { ProjectService } from "../projects/project.service";
import { ProjectFirebaseService } from "../projects/project.firebase.service";
import { ProjectContentModule } from "../project-content/project.content.module";

@NgModule({
    declarations: [
      ProjectComponent
    ],
    imports: [
      CommonModule,
      PipesModule,
      TranslateModule,
      LazyLoadImageModule,
      ProjectRoutingModule,
      ProjectContentModule
    ],
    providers: [ ProjectService, ProjectFirebaseService ],
    exports: [
      ProjectComponent
    ]
  })
  
  export class ProjectModule {
    constructor() {
    }
  }