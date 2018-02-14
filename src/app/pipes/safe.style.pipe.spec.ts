/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SafeStylePipe } from './safe.style.pipe';

describe('SafeStylePipe', () => {
  let component: SafeStylePipe;
  let fixture: ComponentFixture<SafeStylePipe>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SafeStylePipe ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SafeStylePipe);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
