import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireDatabase } from 'angularfire2/database';
import { AuthService } from '../firebase-auth/auth.service';

const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const onlyDigitsRegex = /^(0|[1-9][0-9]*)$/;

@Component({
    selector: 'app-form',
    templateUrl: '../form/form.component.html',
})

export class FormComponent implements OnInit {
    rForm: FormGroup;
    message: any;
    email: string;
    title: number;
    text: string;

    sended = false;

    messages$;

    constructor(private fb: FormBuilder, private af: AngularFireDatabase, public authService: AuthService) {
        this.rForm = fb.group({
            'email': [null, Validators.compose([Validators.required, Validators.pattern(emailRegex)])],
            'title': [null, Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(50)])],
            'text': [null, Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(500)])],
            'validate': ''
        });
    }

    ngOnInit() {
        this.messages$ = this.af.list('messages', ref => ref.limitToFirst(100));
    }

    addMessage(message): void {
        this.email = message.email;
        this.title = message.title;
        this.text = message.text;
        this.pushToFirebase(message);
        this.rForm.reset();
        this.sended = true;
    }

    pushToFirebase(message: any): void {
        this.messages$.push({
            email: message.email,
            title: message.title,
            text: message.text,
        });
    }
}
