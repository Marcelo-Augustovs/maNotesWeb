import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashBordComponent } from './dash-bord.component';

describe('DashBordComponent', () => {
  let component: DashBordComponent;
  let fixture: ComponentFixture<DashBordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashBordComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashBordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
