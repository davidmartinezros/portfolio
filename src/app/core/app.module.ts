import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { enableProdMode } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
// Routing
import { Router } from '@angular/router';
import { RouterModule, Routes } from '@angular/router';
// Firebase
import { AngularFireModule } from 'angularfire2';
import { environment } from '../../environments/environment';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AuthService } from '../firebase-auth/auth.service';
import { FirebaseAuthComponent } from '../firebase-auth/firebase-auth.component';
// My Components
import { TemplateComponent } from '../template/template.component';
import { MainComponent } from '../main/main.component';
import { BlogComponent } from '../blog/blog.component';
import { ProjectsComponent } from '../projects/projects.component';
import { ProjectComponent } from '../project/project.component';
import { FormComponent } from '../form/form.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { DashboardBlogComponent } from '../dashboard/dashboard-blog.component';
import { DashboardContactComponent } from '../dashboard/dashboard-contact.component';
import { ExperienceComponent } from '../experience/experience.component';
import { ProjectService } from '../projects/project.service';
import { ExperienceService } from '../experience/experience.service';
import { PipesModule } from '../pipes/pipes.module';
import { LanguageService } from '../template/language.service';

const appRoutes: Routes = [
  {
    path: 'main',
    component: MainComponent
  },
  {
    path: 'blog',
    component: BlogComponent
  },
  {
    path: 'dashboard',
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
    path: '',
    redirectTo: '/main',
    pathMatch: 'prefix'
  },
  {
    path: '**',
    redirectTo: '/main',
    pathMatch: 'prefix'
  }
];

@NgModule({
  declarations: [
    FirebaseAuthComponent,
    MainComponent,
    BlogComponent,
    TemplateComponent,
    ProjectsComponent,
    ProjectComponent,
    FormComponent,
    DashboardComponent,
    DashboardBlogComponent,
    DashboardContactComponent,
    ExperienceComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'davidmartinezros.com'}),
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    PipesModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    })
  ],
  providers: [AuthService, AngularFireDatabase, BlogComponent, DashboardContactComponent, ProjectService, ExperienceService, LanguageService],
  bootstrap: [TemplateComponent]  // main (first) component
})

export class AppModule { }

if (!/localhost/.test(document.location.host)) {
  enableProdMode();
}

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

