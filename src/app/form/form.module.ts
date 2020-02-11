import { NgModule } from "@angular/core";
import { TranslateModule } from "@ngx-translate/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormComponent } from "./form.component";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";

@NgModule({
    declarations: [ 
      FormComponent 
    ],
    imports: [
      FormsModule,
      ReactiveFormsModule,
      CommonModule,
      TranslateModule,
      RouterModule
    ],
    providers: [ ],
    exports: [ FormComponent ]
  })
  
  export class FormModule {
    constructor() {
    }
  }