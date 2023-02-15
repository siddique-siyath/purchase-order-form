import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletePurchaseOrderComponent } from './delete-purchase-order.component';

describe('DeletePurchaseOrderComponent', () => {
  let component: DeletePurchaseOrderComponent;
  let fixture: ComponentFixture<DeletePurchaseOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeletePurchaseOrderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeletePurchaseOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
