import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { trigger, transition, style, animate, state } from '@angular/animations'


@Component({
  selector: 'app-notes-post-its',
  imports: [DragDropModule,CommonModule,FormsModule],
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
  @Output() notesChange = new EventEmitter<any[]>();

  addNote(){
    const newNote = {
      id: Date.now(), 
      title: '',
      text: '',
      position: this.notes.length,
      editing: true, 
      removing: false 
    }
    this.notes.push(newNote)
    this.emitChange()
  } 

  drop(event: CdkDragDrop<any[]>) {
    moveItemInArray(
      this.notes,
      event.previousIndex,
      event.currentIndex
    )
    this.updatePositions()
  }

  updatePositions(){
    this.notes.forEach((note, index) => {
      note.position = index
    })
    this.emitChange()
  }

  editNote(note:any){
    note.editing = true
  }

  saveNote(note:any){
    note.editing = false
    this.emitChange()
  }

  deleteNote(note: any){
    const confirmDelete = confirm("Deseja excluir essa anotação?")
    if(!confirmDelete) return 

    note.removing = true
    setTimeout(() => {
      this.notes = this.notes.filter(n => n.id !== note.id)
      this.emitChange()
    }, 200)
  }

  private emitChange() {
    this.notesChange.emit(this.notes);
  }
}
