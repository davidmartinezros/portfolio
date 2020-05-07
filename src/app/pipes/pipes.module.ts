import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SafeHtmlPipe } from './safe.html.pipe';
import { SafeStylePipe } from './safe.style.pipe';
import { SafeUrlPipe } from './safe.url.pipe';
import { KeysArrayPipe } from './keys.array.pipe';
import { FilterProjectPipe } from './filter.project';
import { RandomPipe } from './random.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    SafeUrlPipe,
    SafeStylePipe,
    SafeHtmlPipe,
    KeysArrayPipe,
    FilterProjectPipe,
    RandomPipe
  ],
  exports: [
    SafeUrlPipe,
    SafeStylePipe,
    SafeHtmlPipe,
    KeysArrayPipe,
    FilterProjectPipe,
    RandomPipe
  ]
})
export class PipesModule { }
