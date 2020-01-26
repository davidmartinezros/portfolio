import { NgModule } from "@angular/core";
import { TranslateModule } from "@ngx-translate/core";
import { PipesModule } from "../pipes/pipes.module";
import { CommonModule } from "@angular/common";
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { DashboardRoutingModule } from "./dashboard.rounting.module";
import { DashboardContactComponent } from "./dashboard-contact.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
    declarations: [
      DashboardContactComponent
    ],
    imports: [
      CommonModule,
      PipesModule,
      TranslateModule,
      LazyLoadImageModule,
      FormsModule,
      ReactiveFormsModule,
      DashboardRoutingModule
    ],
    providers: [],
    exports: [
      DashboardContactComponent
    ]
  })
  
  export class DashboardModule {
    constructor() {
      console.log('DashboardModule');
    }
  }