import { HttpClientModule, HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule, BrowserTransferStateModule, TransferState } from '@angular/platform-browser';
import { TransferHttpCacheModule } from '@nguniversal/common';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TemplateComponent } from './template/template.component';
import { TranslateBrowserLoader } from './core/translate-browser-loader.service';
import { AppRoutingModule } from './app.routing.module';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { MatProgressBarModule } from '@angular/material';
import { MenuModule } from './menu/menu.module';
import { FooterModule } from './footer/footer.module';

@NgModule({
  declarations: [
    TemplateComponent
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    BrowserModule.withServerTransition({appId: 'davidmartinezros.com'}),
    BrowserTransferStateModule,
    TransferHttpCacheModule,
    HttpClientModule,
    MenuModule,
    FooterModule,
    MatProgressBarModule,
    TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: exportTranslateStaticLoader,
          deps: [HttpClient, TransferState]
        }
    }),
    AppRoutingModule
  ],
  providers: [ ],
  bootstrap: [ TemplateComponent ]  // main (first) component
})

export class AppModule {
  constructor() {
    console.log('AppModule');
  }
}

export function exportTranslateStaticLoader(http: HttpClient, transferState: TransferState) {
  return new TranslateBrowserLoader('/assets/i18n/', '.json', transferState, http);
}
