import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeriodMenuComponent } from './period-menu.component';

describe('PeriodMenuComponent', () => {
  let component: PeriodMenuComponent;
  let fixture: ComponentFixture<PeriodMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PeriodMenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PeriodMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
