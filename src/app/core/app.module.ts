import { HttpClientModule, HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule, BrowserTransferStateModule, TransferState } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { TransferHttpCacheModule } from '@nguniversal/common';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
// Firebase
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { BarRatingModule } from 'ngx-bar-rating';
import { environment } from '../../environments/environment';
import { BlogComponent } from '../blog/blog.component';
import { DashboardBlogComponent } from '../dashboard/dashboard-blog.component';
import { DashboardContactComponent } from '../dashboard/dashboard-contact.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { ExperienceComponent } from '../experience/experience.component';
import { ExperienceService } from '../experience/experience.service';
import { AuthService } from '../firebase-auth/auth.service';
import { FirebaseAuthComponent } from '../firebase-auth/firebase-auth.component';
import { FormComponent } from '../form/form.component';
import { HistoryComponent } from '../history/history.component';
import { KnowledgeService } from '../main/knowledge.service';
import { MainComponent } from '../main/main.component';
import { PipesModule } from '../pipes/pipes.module';
import { ProjectComponent } from '../project/project.component';
import { ProjectService } from '../projects/project.service';
import { ProjectsComponent } from '../projects/projects.component';
import { LanguageService } from '../template/language.service';
import { LazyLoadImageModule, scrollPreset } from 'ng-lazyload-image';
// My Components
import { TemplateComponent } from '../template/template.component';
import { TranslateBrowserLoader } from './translate-browser-loader.service';
import { ThemeComponent } from '../theme/theme.component';
import { ThemeGroupComponent } from '../theme/themeGroup.component';
import { LanguageComponent } from '../template/language.component';

const appRoutes: Routes = [
  {
    path: ':urlMain',
    component: MainComponent
  },
  {
    path: ':urlMain/:group/:technology/:lang/:theme',
    component: ThemeGroupComponent
  },
  {
    path: ":urlMain/:urlProject/:lang/:nom",
    component: ProjectComponent
  },
  {
    path: ':urlMain/blog',
    component: BlogComponent
  },
  {
    path: ':urlMain/dashboard',
    component: DashboardComponent,
    children: [
      {
        path: '',
        redirectTo: 'blog',
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
    ]
  },
  {
    path: ':urlMain/:urlHistory',
    component: HistoryComponent
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
  declarations: [
    FirebaseAuthComponent,
    MainComponent,
    BlogComponent,
    LanguageComponent,
    TemplateComponent,
    ProjectsComponent,
    ProjectComponent,
    FormComponent,
    DashboardComponent,
    DashboardBlogComponent,
    DashboardContactComponent,
    ExperienceComponent,
    HistoryComponent,
    ThemeGroupComponent,
    ThemeComponent
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'davidmartinezros.com'}),
    BrowserTransferStateModule,
    TransferHttpCacheModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    PipesModule,
    BarRatingModule,
    LazyLoadImageModule.forRoot({
      preset: scrollPreset // <-- tell LazyLoadImage that you want to use scrollPreset
    }),
    /*
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    })
    */
    /*
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: translateFactory
      }
    })
    */
   TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: exportTranslateStaticLoader,
        deps: [HttpClient, TransferState]
      }
    })
  ],
  providers: [AuthService, AngularFireDatabase, BlogComponent, DashboardContactComponent, ProjectService, ExperienceService, LanguageService, KnowledgeService],
  bootstrap: [TemplateComponent]  // main (first) component
})

export class AppModule {
  constructor() {
    console.log('AppModule');
  }
}
/*
if (!/localhost/.test(document.location.host)) {
  enableProdMode();
}
*/

export function exportTranslateStaticLoader(http: HttpClient, transferState: TransferState) {
  return new TranslateBrowserLoader('/assets/i18n/', '.json', transferState, http);
}
