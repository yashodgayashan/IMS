import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotSelectedStudentsComponent } from './not-selected-students.component';

describe('NotSelectedStudentsComponent', () => {
  let component: NotSelectedStudentsComponent;
  let fixture: ComponentFixture<NotSelectedStudentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotSelectedStudentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotSelectedStudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
