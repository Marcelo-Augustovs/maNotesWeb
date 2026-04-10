import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotesPostItsComponent } from './notes-post-its.component';

describe('NotesPostItsComponent', () => {
  let component: NotesPostItsComponent;
  let fixture: ComponentFixture<NotesPostItsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotesPostItsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotesPostItsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
