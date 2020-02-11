import { NgModule } from "@angular/core";
import { TranslateModule } from "@ngx-translate/core";
import { PipesModule } from "../pipes/pipes.module";
import { CommonModule } from "@angular/common";
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { MenuComponent } from "./menu.component";
import { LanguageComponent } from "./language.component";
import { MusicComponent } from "../music/music.component";
import { FirebaseAuthComponent } from "../firebase-auth/firebase-auth.component";
import { LanguageService } from "./language.service";
import { AngularFireDatabase } from "angularfire2/database";
import { AuthService } from "../firebase-auth/auth.service";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TemplateWebComponent } from "../template-web/template-web.component";

@NgModule({
    declarations: [ 
      LanguageComponent,
      MenuComponent,
      MusicComponent,
      FirebaseAuthComponent 
    ],
    imports: [
      CommonModule,
      PipesModule,
      RouterModule,
      FormsModule,
      ReactiveFormsModule,
      TranslateModule,
      LazyLoadImageModule
    ],
    providers: [ AuthService, AngularFireDatabase, LanguageService ],
    exports: [ MenuComponent ]
  })
  
  export class MenuModule {
    constructor() {
      console.log('MenuModule');
      TemplateWebComponent.loadedAppModule++;
    }
  }