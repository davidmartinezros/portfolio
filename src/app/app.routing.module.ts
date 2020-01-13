import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomPreloadingStrategy } from './custom.preloading.strategy.service';

const appRoutes: Routes = [
    {
      path: ':urlMain',
      /*component: MainComponent*/
      loadChildren: () => import("./main/main.module").then(m => m.MainModule),
      data: { preload: true, delay:10000 }
    },
    {
      path: ':urlMain/:group/:technology/:lang/:theme',
      /*component: ThemeGroupComponent,*/
      loadChildren: () => import("./theme/theme.module").then(m => m.ThemeModule),
      data: { preload: true, delay:10000 }
      /*loadChildren:  './theme/theme.module#ThemeModule',*/
    },
    {
      path: ':urlMain/:urlProject/:lang/:nom',
      /*component: ProjectComponent*/
      loadChildren: () => import('./project/project.module').then(m => m.ProjectModule),
      data: { preload: true, delay:10000 }
      /*loadChildren:  './project/project.module#ProjectModule',*/
    },
    {
      path: ':urlMain/dashboard',
      /*component: DashboardComponent,*/
      loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
      data: { preload: true, delay:10000 }
      /*loadChildren:  './dashboard/dashboard.module#DashboardModule',*/
    },
    {
      path: ':urlMain/:urlHistory',
      /*component: HistoryComponent*/
      loadChildren: () => import('./history/history.module').then(m => m.HistoryModule),
      data: { preload: true, delay:10000 }
      /*loadChildren:  './history/history.module#HistoryModule',*/
    },
    {
      path: '',
      redirectTo: '/portfolio-full-stack-developer-software-engineer',
      pathMatch: 'full'
    },
    {
      path: '**',
      redirectTo: '/portfolio-full-stack-developer-software-engineer',
      pathMatch: 'full'
    }
  ];
  
@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {
      /*enableTracing: true, */// <-- debugging purposes only
      preloadingStrategy: CustomPreloadingStrategy,
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled',
      scrollOffset: [0, 64],
    }
  )],
  providers: [ CustomPreloadingStrategy ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {

}
