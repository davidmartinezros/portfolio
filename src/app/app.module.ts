import { HttpClientModule, HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule, BrowserTransferStateModule, TransferState } from '@angular/platform-browser';
import { TransferHttpCacheModule } from '@nguniversal/common';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
// Firebase
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { BarRatingModule } from 'ngx-bar-rating';
import { environment } from '../environments/environment';
import { ExperienceComponent } from './experience/experience.component';
import { ExperienceService } from './experience/experience.service';
import { AuthService } from './firebase-auth/auth.service';
import { FirebaseAuthComponent } from './firebase-auth/firebase-auth.component';
import { FormComponent } from './form/form.component';
import { KnowledgeService } from './main/knowledge.service';
import { MainComponent } from './main/main.component';
import { PipesModule } from './pipes/pipes.module';
import { ProjectService } from './projects/project.service';
import { ProjectsComponent } from './projects/projects.component';
import { LanguageService } from './template/language.service';
import { LazyLoadImageModule, scrollPreset } from 'ng-lazyload-image';
// My Components
import { TemplateComponent } from './template/template.component';
import { TranslateBrowserLoader } from './core/translate-browser-loader.service';
import { LanguageComponent } from './template/language.component';
import { AppRoutingModule } from './app.routing.module';
import { ImageComponent } from './image/image.component';

@NgModule({
  declarations: [
    FirebaseAuthComponent,
    MainComponent,
    LanguageComponent,
    TemplateComponent,
    ProjectsComponent,
    FormComponent,
    ExperienceComponent,
    ImageComponent
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'davidmartinezros.com'}),
    BrowserTransferStateModule,
    TransferHttpCacheModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    PipesModule,
    BarRatingModule,
    LazyLoadImageModule.forRoot({
      preset: scrollPreset
    }),
    TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: exportTranslateStaticLoader,
          deps: [HttpClient, TransferState]
        }
    }),
    AppRoutingModule
  ],
  providers: [AuthService, AngularFireDatabase, ProjectService, ExperienceService, LanguageService, KnowledgeService],
  bootstrap: [TemplateComponent]  // main (first) component
})

export class AppModule {
  constructor() {
    console.log('AppModule');
  }
}
/*
if (!/localhost/.test(document.location.host)) {
  enableProdMode();
}
*/

export function exportTranslateStaticLoader(http: HttpClient, transferState: TransferState) {
  return new TranslateBrowserLoader('/assets/i18n/', '.json', transferState, http);
}
