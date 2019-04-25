import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SafeHtmlPipe } from './safe.html.pipe';
import { SafeStylePipe } from './safe.style.pipe';
import { SafeUrlPipe } from './safe.url.pipe';

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
