/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SafeUrlPipe } from './safe.url.pipe';

describe('SafeUrlPipe', () => {
  let component: SafeUrlPipe;
  let fixture: ComponentFixture<SafeUrlPipe>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SafeUrlPipe ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SafeUrlPipe);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});