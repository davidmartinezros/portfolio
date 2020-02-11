import { Component, ElementRef, OnInit, ViewChild, Inject, PLATFORM_ID } from '@angular/core';
import { EngineService } from './engine.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-3d-intro',
  templateUrl: './engine.component.html'
})
export class EngineComponent implements OnInit {

  @ViewChild('rendererCanvas', { static: true })
  public rendererCanvas: ElementRef<HTMLCanvasElement>;

  constructor(@Inject(PLATFORM_ID) private platformId: Object,
    private engServ: EngineService) { }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.engServ.createScene(this.rendererCanvas);
      this.engServ.animate();
    }
  }

}
