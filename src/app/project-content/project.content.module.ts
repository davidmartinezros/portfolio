import { NgModule } from "@angular/core";
import { TranslateModule } from "@ngx-translate/core";
import { PipesModule } from "../pipes/pipes.module";
import { CommonModule } from "@angular/common";
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { ProjectFirebaseService } from "../projects/project.firebase.service";
import { ProjectContentComponent } from "./project.content.component";
import { RouterModule } from "@angular/router";

@NgModule({
    declarations: [
      ProjectContentComponent
    ],
    imports: [
      CommonModule,
      PipesModule,
      TranslateModule,
      LazyLoadImageModule,
      RouterModule
    ],
    providers: [ ProjectFirebaseService ],
    exports: [
      ProjectContentComponent
    ]
  })
  
  export class ProjectContentModule {
    constructor() {
      console.log('ProjectContentModule');
    }
  }