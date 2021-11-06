/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RemediosFormComponent } from './remedios-form.component';

describe('MedicamentoSintomasEditComponent', () => {
  let component: RemediosFormComponent;
  let fixture: ComponentFixture<RemediosFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RemediosFormComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemediosFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
