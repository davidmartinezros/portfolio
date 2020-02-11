import { NgModule } from '@angular/core';
import { IntroComponent } from './intro.component';
import { EngineComponent } from './engine/engine.component';
import { UiComponent } from './ui/ui.component';
import { CommonModule } from '@angular/common';
import { IntroRoutingModule } from './intro.rounting.module';
import { MatProgressBarModule } from '@angular/material';

@NgModule({
  declarations: [
    IntroComponent,
    EngineComponent,
    UiComponent
  ],
  imports: [
    CommonModule,
    MatProgressBarModule,
    IntroRoutingModule
  ],
  providers: [ ],
  exports: [
    IntroComponent
  ]
})
export class IntroModule {
  constructor() {
    console.log("IntroModule");
  }
}
