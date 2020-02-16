import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomPreloadingStrategy } from './core/custom.preloading.strategy.service';
import { TemplateWebComponent } from './template-web/template-web.component';

const appRoutes: Routes = [
    {
      path: '',
      loadChildren: () => import('./intro/intro.module').then(m => m.IntroModule),
      data: { preload: true, animation: 'IntroPage' }
    },
    {
      path: ':urlMain',
      component: TemplateWebComponent,
      children:[
        {
          path: '',
          loadChildren: () => import("./main/main.module").then(m => m.MainModule),
          data: { preload: true, animation: 'MainPage' }
        },
        {
          path: ':group/:technology/:lang/:theme',
          loadChildren: () => import("./theme/theme.module").then(m => m.ThemeModule),
          data: { preload: true, animation: 'ThemePage' }
        },
        {
          path: ':urlProject/:lang/:nom',
          loadChildren: () => import('./project/project.module').then(m => m.ProjectModule),
          data: { preload: true, animation: 'ProjectPage' }
        },
        {
          path: 'dashboard',
          loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
          data: { preload: true, animation: 'DashboardPage' }
        },
        {
          path: ':urlHistory',
          loadChildren: () => import('./history/history.module').then(m => m.HistoryModule),
          data: { preload: true, animation: 'HistoryPage' }
        }
      ]
    },
    /*{
      path: '',
      redirectTo: '/portfolio-full-stack-developer-software-engineer',
      pathMatch: 'full'
    },*/
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
      onSameUrlNavigation: 'reload',
      anchorScrolling: 'enabled',
      scrollOffset: [0, 64],
    }
  )],
  providers: [ CustomPreloadingStrategy ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {

}
