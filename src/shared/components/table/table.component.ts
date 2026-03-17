import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TableColumn } from '../../models/table-column.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-table',
  imports: [CommonModule,FormsModule],
  standalone: true,
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent {

  @Input() title!:string
  @Input() columns!:TableColumn[]
  @Input() rows!:any[]

  @Output() rowsChange = new EventEmitter<any[]>()

  addRow(){

    const newRow:any = {}

    this.columns.forEach(col => {

      if(col.type === 'checkbox'){
        newRow[col.field] = false
      }else{
        newRow[col.field] = ''
      }

    })

    this.rows.push(newRow)

    this.emitChange()

  }

  deleteRow(index:number){

    this.rows.splice(index,1)

    this.emitChange()

  }

  emitChange(){

    this.rowsChange.emit(this.rows)

  }



  isBoolean(value:any){

    return typeof value === 'boolean'

  }

  
}