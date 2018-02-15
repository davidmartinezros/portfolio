import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SafeUrlPipe } from './safe.url.pipe';
import { SafeStylePipe } from './safe.style.pipe';
import { SafeHtmlPipe } from './safe.html.pipe';
import { ConvertToArrayPipe } from './safe.arrays.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    SafeUrlPipe,
    SafeStylePipe,
    SafeHtmlPipe,
    ConvertToArrayPipe
  ],
  exports: [
    SafeUrlPipe,
    SafeStylePipe,
    SafeHtmlPipe,
    ConvertToArrayPipe
  ]
})
export class PipesModule { }
