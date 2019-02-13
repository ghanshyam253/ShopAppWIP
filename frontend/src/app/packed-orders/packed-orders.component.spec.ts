import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PackedOrdersComponent } from './packed-orders.component';

describe('PackedOrdersComponent', () => {
  let component: PackedOrdersComponent;
  let fixture: ComponentFixture<PackedOrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PackedOrdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PackedOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
