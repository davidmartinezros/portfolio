import { NgModule } from "@angular/core";
import { TranslateModule } from "@ngx-translate/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { CarouselComponent } from "./carousel.component";
import { CarouselService } from "./carousel.service";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { LazyLoadImageModule, LoadImageProps } from 'ng-lazyload-image';
import { PipesModule } from "../pipes/pipes.module";

@NgModule({
    declarations: [
        CarouselComponent
    ],
    imports: [
      CommonModule,
      TranslateModule,
      RouterModule,
      NgbModule,
      LazyLoadImageModule.forRoot({ loadImage }),
      PipesModule
    ],
    providers: [ CarouselService ],
    exports: [
        CarouselComponent
    ]
  })
  
  export class CarouselModule {
    constructor() {
    }
  }

  export function loadImage({ imagePath }: LoadImageProps) {
    return [imagePath];
  }