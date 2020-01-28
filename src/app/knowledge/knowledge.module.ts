import { NgModule } from "@angular/core";
import { TranslateModule } from "@ngx-translate/core";
import { PipesModule } from "../pipes/pipes.module";
import { CommonModule } from "@angular/common";
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { RouterModule } from "@angular/router";
import { KnowledgeComponent } from "./knowledge.component";
import { KnowledgeService } from "./knowledge.service";
import { BarRatingModule } from "ngx-bar-rating";

@NgModule({
    declarations: [
        KnowledgeComponent
    ],
    imports: [
      CommonModule,
      PipesModule,
      TranslateModule,
      LazyLoadImageModule,
      RouterModule,
      BarRatingModule
    ],
    providers: [ KnowledgeService ],
    exports: [
        KnowledgeComponent
    ]
  })
  
  export class KnowledgeModule {
    constructor() {
      console.log('KnowledgeModule');
    }
  }