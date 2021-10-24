/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SintomasEditComponent } from './sintomas-edit.component';

describe('SintomasEditComponent', () => {
  let component: SintomasEditComponent;
  let fixture: ComponentFixture<SintomasEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SintomasEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SintomasEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
