import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { NotesService } from '../../../service/notesService';
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
  
  constructor(private notesService: NotesService){}

  notes: any[] = []

  private notesSubject = new BehaviorSubject<any[]>([])
    notes$ = this.notesSubject.asObservable()

    ngOnInit(){
     this.loadNotes()
    }

   addNote(){
      const newNote = {
        id: null, 
        title: '',
        text: '',
        position: this.notes.length,
        editing: true, 
        removing: false 
      }

      this.notes.push(newNote)

    } 

    

    savePositions(){

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
  
      this.savePositions()
  
    }
  
    loadNotes(){

      this.notesService.getAll().subscribe((data:any[]) => {

        this.notes = data.map(notes => ({

          id: notes.id,
          title: notes.title,
          text: notes.notes,
          position: 0,
          editing: false,
          removing: false

        }))
      })
    }
    
    editNote(note:any){

      note.editing = true

      }

      saveNote(note:any){

          if(!note.id){
            this.notesService.create(note).subscribe(res => {
              note.id = res.id 
            })
          }else{
            this.notesService.update(note).subscribe()
          }

          note.editing = false
      }

     deleteNote(note: any){

      const confirmDelete = confirm("Deseja excluir essa anotação?")

      if(!confirmDelete) return 

        note.removing = true

        setTimeout(() => {

          this.notes = this.notes.filter(n => n.id !== note.id)

          if(note.id){
            this.notesService.delete(note.id).subscribe()
          }

        }, 200)
     }
}
