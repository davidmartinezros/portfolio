import { NgModule } from "@angular/core";
import { TranslateModule } from "@ngx-translate/core";
import { PipesModule } from "../pipes/pipes.module";
import { CommonModule } from "@angular/common";
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { ProjectComponent } from "./project.component";
import { ProjectRoutingModule } from "./project.rounting.module";

@NgModule({
    declarations: [
      ProjectComponent
    ],
    imports: [
      CommonModule,
      PipesModule,
      TranslateModule,
      LazyLoadImageModule,
      ProjectRoutingModule
    ],
    providers: [],
    exports: [
      ProjectComponent
    ]
  })
  
  export class ProjectModule {
    constructor() {
      console.log('ProjectModule');
    }
  }