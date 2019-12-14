import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { MainComponent } from '../main/main.component';

const appRoutes: Routes = [
    {
      path: ':urlMain',
      component: MainComponent
    },
    {
      path: ':urlMain/:group/:technology/:lang/:theme',
      /*component: ThemeGroupComponent,*/
      loadChildren: () => import('../theme/theme.module').then(m => m.ThemeModule)
      /*loadChildren: './theme/theme.module#ThemeModule'*/ 
    },
    {
      path: ":urlMain/:urlProject/:lang/:nom",
      /*component: ProjectComponent*/
      loadChildren: () => import('../project/project.module').then(m => m.ProjectModule)
    },
    {
      path: ':urlMain/dashboard',
      /*component: DashboardComponent,*/
      loadChildren: () => import('../dashboard/dashboard.module').then(m => m.DashboardModule)
    },
    {
      path: ':urlMain/:urlHistory',
      /*component: HistoryComponent*/
      loadChildren: () => import('../history/history.module').then(m => m.HistoryModule)
    },
    {
      path: '',
      redirectTo: '/full-stack-developer-software-engineer',
      pathMatch: 'prefix'
    },
    {
      path: '**',
      redirectTo: '/full-stack-developer-software-engineer',
      pathMatch: 'prefix'
    }
  ];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {
      enableTracing: true, // <-- debugging purposes only
      preloadingStrategy: PreloadAllModules
    }
  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }