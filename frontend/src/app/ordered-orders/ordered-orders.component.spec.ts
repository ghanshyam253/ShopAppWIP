import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderedOrdersComponent } from './ordered-orders.component';

describe('OrderedOrdersComponent', () => {
  let component: OrderedOrdersComponent;
  let fixture: ComponentFixture<OrderedOrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderedOrdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderedOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
