import { HttpClientModule, HttpClient } from '@angular/common/http';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule, BrowserTransferStateModule, TransferState } from '@angular/platform-browser';
import { TransferHttpCacheModule } from '@nguniversal/common';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AuthService } from './firebase-auth/auth.service';
import { PipesModule } from './pipes/pipes.module';
import { LanguageService } from './template/language.service';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { TemplateComponent } from './template/template.component';
import { TranslateBrowserLoader } from './core/translate-browser-loader.service';
import { LanguageComponent } from './template/language.component';
import { AppRoutingModule } from './app.routing.module';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { FirebaseAuthComponent } from './firebase-auth/firebase-auth.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    LanguageComponent,
    TemplateComponent,
    FirebaseAuthComponent
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule.withServerTransition({appId: 'davidmartinezros.com'}),
    BrowserTransferStateModule,
    TransferHttpCacheModule,
    HttpClientModule,
    PipesModule,
    LazyLoadImageModule,
    TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: exportTranslateStaticLoader,
          deps: [HttpClient, TransferState]
        }
    }),
    AppRoutingModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
  providers: [ AuthService, AngularFireDatabase, LanguageService ],
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
