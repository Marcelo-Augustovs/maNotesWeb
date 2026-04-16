import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NotesService, Note, TableData } from './notes.service';
import { FormsModule } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { NotesPostItsComponent } from '../../../shared/components/notes-post-its/notes-post-its.component';

@Component({
  selector: 'app-notes',
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatDividerModule,
    NotesPostItsComponent
  ],
  standalone: true,
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.scss'
})
export class NotesComponent implements OnInit {

  notes: Note[] = [];

  tables: TableData[] = [];
  selectedTable: any = null;

  constructor(private notesService: NotesService) { }

  ngOnInit() {
    this.notesService.getNotes().subscribe(data => {
      this.notes = data;
      this.loadNotes();
    });

    this.notesService.getTables().subscribe(data => {
      this.tables = data;
    });
  }

  loadNotes() {
    this.notes.sort((a, b) => a.position - b.position);
  }

  onNotesChange(updatedNotes: Note[]) {
    this.notes = updatedNotes;
    this.notesService.saveNotes(this.notes).subscribe();
  }

  // --- LOGICA DE TABELAS (RECUPERADOS) ---
  openTable(table: any) {
    this.selectedTable = table;
  }

  closeTable() {
    this.selectedTable = null;
  }

  createTable() {
    const newTable: TableData = {
      id: Date.now(),
      title: "Nova tabela",
      columns: [
        { label: "Coluna 1", field: "col1" },
        { label: "Coluna 2", field: "col2" }
      ],
      rows: []
    }
    this.tables.push(newTable);
    this.notesService.saveTables(this.tables).subscribe();
  }

  deleteTable(index: number) {
    if (confirm("Deseja excluir essa tabela?")) {
      this.tables.splice(index, 1);
      this.notesService.saveTables(this.tables).subscribe();
    }
  }
}
