import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Note } from './models/Note.model';
import { TableService, TableData } from '../../shared/services/table.service';
import { FormsModule } from '@angular/forms';
import { NotesService } from './services/notes.service';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { NotesPostItsComponent } from '../../../shared/components/notes-post-its/notes-post-its.component';
import { DynamicTableComponent } from '../../shared/components/dynamic-table/dynamic-table.component';

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
    NotesPostItsComponent,
    DynamicTableComponent
  ],
  standalone: true,
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.scss'
})
export class NotesComponent implements OnInit {

  notes: Note[] = [];

  tables: TableData[] = [];
  selectedTable: any = null;

  constructor(
    private notesService: NotesService,
    private tableService: TableService
  ) { }

  ngOnInit() {
    this.loadNotesFromApi();
    this.loadTables();
  }

  loadNotesFromApi() {
    this.notesService.getAll().subscribe((data: Note[]) => {
      this.notes = data;
      this.loadNotes();
    });
  }

  loadNotes() {
    this.notes.sort((a, b) => a.position - b.position);
  }

  onSaveNote(note: Note) {
    if (note.id === 0) { // Nota nova
      this.notesService.create(note).subscribe({
        next: () => {
          console.log('Nota criada com sucesso!');
          this.loadNotesFromApi();
        },
        error: (err) => console.error('Erro ao criar nota:', err)
      });
    } else { // Nota existente
      this.notesService.update(note).subscribe({
        next: () => {
          console.log('Nota atualizada com sucesso!');
          this.loadNotesFromApi();
        },
        error: (err) => console.error('Erro ao atualizar nota:', err)
      });
    }
  }

  onDeleteNote(note: Note) {
    if (note.id !== 0) {
      this.notesService.delete(note.id).subscribe({
        next: () => {
          console.log('Nota excluída com sucesso!');
          this.loadNotesFromApi();
        },
        error: (err) => console.error('Erro ao excluir nota:', err)
      });
    } else {
      // Era uma nota local que nunca foi pro banco
      this.loadNotesFromApi();
    }
  }

  // --- LÓGICA DE TABELAS (RECUPERADOS) ---
  openTable(table: any) {
    this.selectedTable = JSON.parse(JSON.stringify(table));
  }

  closeTable() {
    this.selectedTable = null;
    this.loadTables();
  }

  loadTables() {
    this.tableService.getTables().subscribe(data => {
      this.tables = data;
    });
  }

  createTable() {
    const newTable: TableData = {
      id: 0,
      title: "Nova Tabela",
      columns: [
        { label: "Coluna 1", field: "col1" },
        { label: "Coluna 2", field: "col2" }
      ],
      rows: []
    }
    this.tableService.createTable(newTable).subscribe(() => {
      this.loadTables();
    });
  }

  deleteTable(id: number) {
    if (confirm("Deseja excluir essa tabela?")) {
      this.tableService.deleteTable(id).subscribe(() => {
        this.loadTables();
      });
    }
  }

  onTableChange(updatedTable: TableData) {
    this.selectedTable = updatedTable;
    if (this.selectedTable.id) {
      this.tableService.updateTable(this.selectedTable.id, this.selectedTable).subscribe();
    }
  }
}
