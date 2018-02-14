import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SafeUrlPipe } from './safe.url.pipe';
import { SafeStylePipe } from './safe.style.pipe';
import { SafeHtmlPipe } from './safe.html.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    SafeUrlPipe,
    SafeStylePipe,
    SafeHtmlPipe
  ],
  exports: [
    SafeUrlPipe,
    SafeStylePipe,
    SafeHtmlPipe
  ]
})
export class PipesModule { }
