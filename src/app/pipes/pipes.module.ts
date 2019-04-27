import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SafeHtmlPipe } from './safe.html.pipe';
import { SafeStylePipe } from './safe.style.pipe';
import { SafeUrlPipe } from './safe.url.pipe';
import { KeysArrayPipe } from './keys.array.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    SafeUrlPipe,
    SafeStylePipe,
    SafeHtmlPipe,
    KeysArrayPipe
  ],
  exports: [
    SafeUrlPipe,
    SafeStylePipe,
    SafeHtmlPipe,
    KeysArrayPipe
  ]
})
export class PipesModule { }
