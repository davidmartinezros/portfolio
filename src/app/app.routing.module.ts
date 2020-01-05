import { NgModule } from '@angular/core';
import { Routes, RouterModule, NoPreloading } from '@angular/router';

const appRoutes: Routes = [
    {
      path: ':urlMain',
      /*component: MainComponent*/
      loadChildren: () => import("./main/main.module").then(m => m.MainModule),
    },
    {
      path: ':urlMain/:group/:technology/:lang/:theme',
      /*component: ThemeGroupComponent,*/
      loadChildren: () => import("./theme/theme.module").then(m => m.ThemeModule),
      /*loadChildren:  './theme/theme.module#ThemeModule',*/
    },
    {
      path: ':urlMain/:urlProject/:lang/:nom',
      /*component: ProjectComponent*/
      loadChildren: () => import('./project/project.module').then(m => m.ProjectModule),
      /*loadChildren:  './project/project.module#ProjectModule',*/
    },
    {
      path: ':urlMain/dashboard',
      /*component: DashboardComponent,*/
      loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
      /*loadChildren:  './dashboard/dashboard.module#DashboardModule',*/
    },
    {
      path: ':urlMain/:urlHistory',
      /*component: HistoryComponent*/
      loadChildren: () => import('./history/history.module').then(m => m.HistoryModule),
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

/*
export class AppCustomPreloader implements PreloadingStrategy {
  preload(route: Route, load: Function): Observable<any> {
    return route.data && route.data.preload ? load() : of(null);
  }
}
*/
/*
export class AppPreloadingStrategy implements PreloadingStrategy {
    preload(route: Route, load: Function): Observable<any> {
        const loadRoute = (delay) => delay
            ? timer(150).pipe(flatMap(_ => load()))
            : load();
        return route.data && route.data.preload 
            ? loadRoute(route.data.delay)
            : of(null);
      }
}
*/
@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {
      /*enableTracing: true, */// <-- debugging purposes only
      preloadingStrategy: NoPreloading,
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled',
      scrollOffset: [0, 64],
    }
  )],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
