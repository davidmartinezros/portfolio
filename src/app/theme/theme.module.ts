import { ThemeComponent } from "./theme.component";
import { NgModule } from "@angular/core";
import { ThemeRoutingModule } from "./theme.rounting.module";
import { TranslateModule } from "@ngx-translate/core";
import { PipesModule } from "../pipes/pipes.module";
import { CommonModule } from "@angular/common";
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { ProjectService } from "../projects/project.service";
import { ProjectFirebaseService } from "../projects/project.firebase.service";
import { ProjectsModule } from "../projects/projects.module";

@NgModule({
    declarations: [
      ThemeComponent
    ],
    imports: [
      CommonModule,
      PipesModule,
      TranslateModule,
      LazyLoadImageModule,
      ThemeRoutingModule,
      ProjectsModule
    ],
    providers: [ ProjectService, ProjectFirebaseService ],
    exports: [
      ThemeComponent
    ]
  })
  
  export class ThemeModule {
    constructor() {
      console.log('ThemeModule');
    }
  }