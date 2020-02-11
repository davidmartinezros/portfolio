import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { MatProgressBarModule } from '@angular/material';
import { TemplateWebComponent } from './template-web.component';
import { CommonModule } from '@angular/common';
import { MenuModule } from '../menu/menu.module';
import { FooterModule } from '../footer/footer.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    TemplateWebComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatProgressBarModule,
    TranslateModule,
    MenuModule,
    FooterModule
  ],
  providers: [ ],
  exports: [ TemplateWebComponent ]
})

export class TemplateWebModule {
  constructor() {
    console.log('TemplateWebModule');
  }
}
