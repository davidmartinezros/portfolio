import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../firebase-auth/auth.service';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
    selector: 'app-blog',
    templateUrl: '../blog/blog.component.html'
})

export class BlogComponent implements OnInit {
    title: string;
    body: string;

    posts$;

    constructor(private af: AngularFireDatabase, public authService: AuthService) { }

    ngOnInit() {
        this.posts$ = this.af.list('posts', ref => ref.limitToFirst(100)).valueChanges();
    }

    addPost(
        title: string,
        body: string,
    ): void {
        this.posts$.push({
            id: 0,
            author: this.authService.currentUser,
            date: new Date().toLocaleDateString(),
            title: title,
            body: body,
        });
    }

    addTodo(post: string): void {
        this.posts$.push({ content: post, done: false });
    }
    deleteTodo(post: any): void {
        this.af.object('/notes/' + post.$key).remove();
    }
    toggleDone(post: any): void {
        this.af.object('/notes/' + post.$key)
            .update({ content: post.content, done: !post.done });
    }
    updateTodo(post: any, newValue: string): void {
        this.af.object('/notes/' + post.$key)
            .update({ content: newValue, done: post.done });
    }

}
