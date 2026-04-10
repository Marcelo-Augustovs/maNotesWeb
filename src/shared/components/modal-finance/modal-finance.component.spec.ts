import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalFinanceComponent } from './modal-finance.component';

describe('ModalFinanceComponent', () => {
  let component: ModalFinanceComponent;
  let fixture: ComponentFixture<ModalFinanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalFinanceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalFinanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
