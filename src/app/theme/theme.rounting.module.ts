import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ThemeGroupComponent } from './themeGroup.component';
import { ThemeModule } from './theme.module';

const routes: Routes = [
  {
    path: '',
    component: ThemeGroupComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ThemeRoutingModule { }