import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { trigger, transition, style, animate, state } from '@angular/animations'


@Component({
  selector: 'app-notes-post-its',
  imports: [DragDropModule, CommonModule, FormsModule],
  standalone: true,
  templateUrl: './notes-post-its.component.html',
  styleUrl: './notes-post-its.component.scss',
  animations: [
    trigger('fadeOut', [

      state('default', style({
        opacity: 1,
        transform: 'scale(1)'
      })),

      state('removing', style({
        opacity: 0,
        transform: 'scale(0.8)'
      })),

      transition('default => removing', [
        animate('200ms ease-in')
      ])

    ])
  ]
})
export class NotesPostItsComponent {

  @Input() notes: any[] = [];
  @Output() saveNoteEvent = new EventEmitter<any>();
  @Output() deleteNoteEvent = new EventEmitter<any>();

  expandedNote: any = null;

  addNote() {
    const newNote = {
      id: 0, // 0 indicates a new note
      title: '',
      text: '',
      position: this.notes.length,
      editing: true,
      removing: false
    }
    this.notes.push(newNote)
  }

  drop(event: CdkDragDrop<any[]>) {
    moveItemInArray(
      this.notes,
      event.previousIndex,
      event.currentIndex
    )
    this.updatePositions()
  }

  updatePositions() {
    this.notes.forEach((note, index) => {
      note.position = index
      // Se quisermos salvar a posição, emitimos o save aqui.
      // this.saveNoteEvent.emit(note); // Opcional, descomente se o backend suportar update de position
    })
  }

  editNote(note: any) {
    note.editing = true
  }

  saveNote(note: any) {
    note.editing = false
    this.saveNoteEvent.emit(note);
  }

  deleteNote(note: any) {
    const confirmDelete = confirm("Deseja excluir essa anotação?")
    if (!confirmDelete) return

    note.removing = true
    setTimeout(() => {
      this.deleteNoteEvent.emit(note);
    }, 200)
  }

  openExpanded(note: any, event?: Event) {
    if (event) {
      event.stopPropagation();
    }
    this.expandedNote = note;
  }

  closeExpanded() {
    this.expandedNote = null;
  }
}

