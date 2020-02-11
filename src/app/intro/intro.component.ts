import { Component, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: []
})
export class IntroComponent {

  title = 'intro';

  static loadedAppModule: number = 0;

  constructor(private cdRef : ChangeDetectorRef) {

  }

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }

  get loadedAppModule() {
    //console.log(IntroComponent.loadedAppModule);
    return IntroComponent.loadedAppModule;
  }
}
