import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Item360Component } from './item-360.component';

describe('Item360Component', () => {
  let component: Item360Component;
  let fixture: ComponentFixture<Item360Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Item360Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Item360Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
