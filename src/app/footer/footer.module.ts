import { NgModule } from "@angular/core";
import { TranslateModule } from "@ngx-translate/core";
import { CommonModule } from "@angular/common";
import { FooterComponent } from "./footer.component";
import { RouterModule } from "@angular/router";
import { TemplateComponent } from "../template/template.component";

@NgModule({
    declarations: [ 
      FooterComponent 
    ],
    imports: [
      CommonModule,
      TranslateModule,
      RouterModule
    ],
    providers: [ ],
    exports: [ FooterComponent ]
  })
  
  export class FooterModule {
    constructor() {
      console.log('FooterModule');
      TemplateComponent.loadedAppModule++;
    }
  }