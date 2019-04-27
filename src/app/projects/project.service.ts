import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { TranslateService } from '@ngx-translate/core';
import 'rxjs/add/operator/toPromise';
import { Project } from './project';



@Injectable()
export class ProjectService {
    
    //private projectsUrl = './assets/i18n/es.json';  // URL to web api
    private headers = new Headers({'Content-Type': 'application/json'});

    constructor(
        private http: Http,
        private translate: TranslateService) { }

    getProjects(): Promise<Project[]> {
        return this.translate.get("projects")
            .toPromise()
            .catch(this.handleError);
        /*
        return this.http.get(this.projectsUrl)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
        */
    }

    getTheTop20Projects(): Promise<Project[]> {
        return this.getProjects()
            .then(projects => (projects.constructor === Array)?projects.filter(project => project.visible === true):null);
    }

    getProjectsWithLang(lang): Promise<Project[]> {
        // this language will be used as a fallback when a translation isn't found in the current language
        this.translate.setDefaultLang(lang);
        
        // the lang to use, if the lang isn't available, it will use the current loader to get them
        this.translate.use(lang);

        return this.getProjects();
    }

    getTypeProjects(tipus: string): Promise<Project[]> {
        return this.getProjects()
             .then(projects => (projects.constructor === Array)?projects.filter(project => project.tipus.toLowerCase() === tipus.toLowerCase()):null);
    }

    getProjectById(id: number): Promise<Project> {
        return this.getProjects()
             .then(projects => (projects.constructor === Array)?projects.find(project => project.id === id):null);
    }

    getProjectByName(lang: string, nom: string): Promise<Project> {
        return this.getProjectsWithLang(lang)
             .then(projects => (projects.constructor === Array)?projects.find(project => project.nom === nom):null);
    }

    /*
    delete(id: number): Promise<void> {
        const url = `${this.projectsUrl}/${id}`;
        return this.http.delete(url, {headers: this.headers})
            .toPromise()
            .then(() => null)
            .catch(this.handleError);
    }
    */

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }

}