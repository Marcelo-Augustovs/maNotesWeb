import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TableComponent } from '../../../shared/components/table/table.component';
import { WEEKLY_TABLE } from '../../../shared/data/weekly.data';
import { FOOD_TABLE } from '../../../shared/data/food.data';
import { CLEANING_TABLE } from '../../../shared/data/cleaning.data';
import { DragDropModule, CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop'

@Component({
  selector: 'app-notes',
  imports: [CommonModule, TableComponent, DragDropModule],
  standalone: true,
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.scss'
})
export class NotesComponent {

  weekly = WEEKLY_TABLE
  cleaning = CLEANING_TABLE
  food = FOOD_TABLE

 notes = [
      {
        id: 1,
        title: "Comprar pão",
        text: "Ir na padaria depois da missa",
        position: 0
      },

      {
        id: 2,
        title: "Estudar Angular",
        text: "Continuar módulo de componentes",
        position: 1
      }
]

addNote(){

console.log("Abrir modal de nova nota")

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

savePositions(){

console.log("Salvar posições", this.notes)

}

loadNotes(){

this.notes.sort((a,b)=> a.position - b.position)

}


}
