import { Component, Input } from '@angular/core';
import { Project } from '../projects/project';
import { Subject }    from 'rxjs/Subject';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../projects/project.service';
import { TranslateService } from '@ngx-translate/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
    selector: 'app-project',
    templateUrl: '../project/project.component.html',
 })

 export class ProjectComponent {

    private nom: string;
    private lang: string;
    private sub: any;
    project: Project;

    constructor(private route: ActivatedRoute,
                private projectService: ProjectService,
                private translate: TranslateService,
                private titleService: Title,
                private metaService: Meta) {
    }
      
    ngOnInit(): void {
        this.sub = this.route.params.subscribe(params => {
            this.lang = params['lang'];
            this.nom = params['nom'];

            if(this.nom) {
                this.projectService.getProjectByName(this.lang, this.nom)
                    .then(project => { 
                        this.project = project;
                        this.changeGoogleSearchItems();
                    }
                );
            }

        });
    }

    private changeGoogleSearchItems() {
        if(this.project) {
            // Sets the <title></title>
             // Sets the <meta> tag author
            this.translate.get("SubtitleIndex")
                .toPromise()        
                .then(subtitle => this.titleService.setTitle(this.project.titol + subtitle))
                .catch(this.handleError);

            // Sets the <meta> tag author
            this.translate.get("TagAuthorIndex")
                .toPromise()        
                .then(author => this.metaService.updateTag({ name: 'author', content: author }))
                .catch(this.handleError);
            
            // Sets the <meta> tag keywords
            this.translate.get("TagKeywordsIndex")
                .toPromise()        
                .then(keywords => this.metaService.updateTag({ name: 'keywords', content: keywords }))
                .catch(this.handleError);

            // Sets the <meta> tag description
            this.metaService.updateTag({ name: 'description', content: this.project.html })
        }    
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }

 }
