import { Component, OnInit } from '@angular/core';
import { EngineService } from '../engine/engine.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ui',
  templateUrl: './ui.component.html'
})
export class UiComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  navigateInto(){
    EngineService.ngOnDestroy();
    // Create Book logic
    this.router.navigate(['/portfolio-full-stack-developer-software-engineer']);
  }

}
