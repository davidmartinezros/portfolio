import { NgModule } from "@angular/core";
import { TranslateModule } from "@ngx-translate/core";
import { PipesModule } from "../pipes/pipes.module";
import { CommonModule } from "@angular/common";
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { HistoryRoutingModule } from "./history.rounting.module";
import { HistoryComponent } from "./history.component";
import { ProjectService } from "../projects/project.service";
import { ProjectFirebaseService } from "../projects/project.firebase.service";

@NgModule({
    declarations: [ HistoryComponent ],
    imports: [
      CommonModule,
      PipesModule,
      TranslateModule,
      LazyLoadImageModule,
      HistoryRoutingModule
    ],
    providers: [ ProjectService, ProjectFirebaseService ],
    exports: [ HistoryComponent ]
  })
  
  export class HistoryModule {
    constructor() {
      console.log('HistoryModule');
    }
  }