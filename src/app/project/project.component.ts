import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Project } from '../projects/project';
import { ProjectService } from '../projects/project.service';

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
            this.translate.get("SubtitleIndex")
            .toPromise()        
            .then(subtitle => {
                this.titleService.setTitle(this.project.titol + subtitle);
                this.metaService.updateTag({ name: 'og:title', content: this.project.titol + subtitle });
                this.metaService.updateTag({ name: 'twitter:title', content: this.project.titol + subtitle });
            })
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
            this.metaService.updateTag({ name: 'description', content: this.project.html });
            this.metaService.updateTag({ name: 'og:description', content: this.project.html });
            this.metaService.updateTag({ name: 'twitter:description', content: this.project.html });

            // Sets the <meta> tag image
            this.translate.get("TagImageIndex")
            .toPromise()        
            .then(image => {
                this.metaService.updateTag({ name: 'image', content: image });
                this.metaService.updateTag({ name: 'og:image', content: image });
                this.metaService.updateTag({ name: 'twitter:image', content: image });
            })
            .catch(this.handleError);

            this.metaService.updateTag({ name: 'og:type', content: 'website' });
            this.metaService.updateTag({ name: 'og:url', content: 'https://davidmartinezros.com' });
            this.metaService.updateTag({ name: 'twitter:card', content: 'summary' });
        }
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }

 }
