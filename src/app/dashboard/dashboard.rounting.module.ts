import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { DashboardBlogComponent } from './dashboard-blog.component';
import { DashboardContactComponent } from './dashboard-contact.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    pathMatch: 'full'
  },
  {
    path: 'blog',
    component: DashboardBlogComponent
  },
  {
    path: 'contact',
    component: DashboardContactComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class DashboardRoutingModule { }