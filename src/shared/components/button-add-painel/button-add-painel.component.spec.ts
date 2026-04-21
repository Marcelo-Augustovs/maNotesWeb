import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonAddPainelComponent } from './button-add-painel.component';

describe('ButtonAddPainelComponent', () => {
  let component: ButtonAddPainelComponent;
  let fixture: ComponentFixture<ButtonAddPainelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonAddPainelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonAddPainelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
