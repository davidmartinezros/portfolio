import { NgModule } from "@angular/core";
import { TranslateModule } from "@ngx-translate/core";
import { PipesModule } from "../pipes/pipes.module";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { ExperienceComponent } from "./experience.component";
import { ExperienceService } from "./experience.service";
import { IntroComponent } from "../intro/intro.component";

@NgModule({
    declarations: [
        ExperienceComponent
    ],
    imports: [
      CommonModule,
      PipesModule,
      TranslateModule,
      RouterModule
    ],
    providers: [ ExperienceService ],
    exports: [
      ExperienceComponent
    ]
  })
  
  export class ExperienceModule {
    constructor() {
    }
  }