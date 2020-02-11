import { NgModule } from "@angular/core";
import { TranslateModule } from "@ngx-translate/core";
import { PipesModule } from "../pipes/pipes.module";
import { CommonModule } from "@angular/common";
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { RouterModule } from "@angular/router";
import { ProjectsComponent } from "./projects.component";
import { ProjectContentModule } from "../project-content/project.content.module";
import { ProjectService } from "./project.service";

@NgModule({
    declarations: [
      ProjectsComponent
    ],
    imports: [
      CommonModule,
      PipesModule,
      TranslateModule,
      LazyLoadImageModule,
      RouterModule,
      ProjectContentModule
    ],
    providers: [ ProjectService ],
    exports: [
      ProjectsComponent
    ]
  })
  
  export class ProjectsModule {
    constructor() {
    }
  }