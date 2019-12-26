import { ThemeComponent } from "./theme.component";
import { ThemeGroupComponent } from "./themeGroup.component";
import { NgModule } from "@angular/core";
import { ThemeRoutingModule } from "./theme.rounting.module";
import { TranslateModule } from "@ngx-translate/core";
import { PipesModule } from "../pipes/pipes.module";
import { CommonModule } from "@angular/common";
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { ProjectService } from "../projects/project.service";
import { ProjectFirebaseService } from "../projects/project.firebase.service";
import { ProjectContentModule } from "../project-content/project.content.module";

@NgModule({
    declarations: [
      ThemeGroupComponent,
      ThemeComponent
    ],
    imports: [
      CommonModule,
      PipesModule,
      TranslateModule,
      LazyLoadImageModule,
      ThemeRoutingModule,
      ProjectContentModule
    ],
    providers: [ ProjectService, ProjectFirebaseService ],
    exports: [
      ThemeGroupComponent
    ]
  })
  
  export class ThemeModule {
    constructor() {
      console.log('ThemeModule');
    }
  }