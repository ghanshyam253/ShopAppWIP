import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InTransitOrdersComponent } from './in-transit-orders.component';

describe('InTransitOrdersComponent', () => {
  let component: InTransitOrdersComponent;
  let fixture: ComponentFixture<InTransitOrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InTransitOrdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InTransitOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
