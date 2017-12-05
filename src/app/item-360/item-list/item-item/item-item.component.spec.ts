import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemItemComponent } from './item-item.component';

describe('ItemItemComponent', () => {
  let component: ItemItemComponent;
  let fixture: ComponentFixture<ItemItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
