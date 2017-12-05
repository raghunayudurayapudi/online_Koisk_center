import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminManageItems360Component } from './admin-manage-items-360.component';

describe('AdminManageItems360Component', () => {
  let component: AdminManageItems360Component;
  let fixture: ComponentFixture<AdminManageItems360Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminManageItems360Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminManageItems360Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
