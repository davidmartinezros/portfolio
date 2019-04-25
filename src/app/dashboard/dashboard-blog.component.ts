import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BlogComponent } from '../blog/blog.component';

@Component({
    selector: 'app-dashboard-blog',
    templateUrl: '../dashboard/dashboard-blog.component.html'
})

export class DashboardBlogComponent implements OnInit {
    rForm: FormGroup;
    title: string;
    body: string;
    blogComponent: BlogComponent;

    constructor(private bComponent: BlogComponent, private fb: FormBuilder) {
        this.blogComponent = bComponent;
        this.rForm = fb.group({
            'title': [null],
            'body': [null],
        });
    }

    ngOnInit() {
        this.blogComponent.ngOnInit();
    }

    add(title, body) {
        this.blogComponent.addPost(title, body);
        this.rForm.reset();
    }

}
