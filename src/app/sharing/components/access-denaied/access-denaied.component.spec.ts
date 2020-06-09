import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessDenaiedComponent } from './access-denaied.component';

describe('AccessDenaiedComponent', () => {
  let component: AccessDenaiedComponent;
  let fixture: ComponentFixture<AccessDenaiedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccessDenaiedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccessDenaiedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
