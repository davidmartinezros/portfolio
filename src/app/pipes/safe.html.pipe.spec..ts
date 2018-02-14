/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SafeHtmlPipe } from './safe.html.pipe';

describe('SafeUrlPipe', () => {
  let component: SafeHtmlPipe;
  let fixture: ComponentFixture<SafeHtmlPipe>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SafeHtmlPipe ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SafeHtmlPipe);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});