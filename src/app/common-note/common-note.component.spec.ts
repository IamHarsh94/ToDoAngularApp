import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonNoteComponent } from './common-note.component';

describe('CommonNoteComponent', () => {
  let component: CommonNoteComponent;
  let fixture: ComponentFixture<CommonNoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommonNoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommonNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
