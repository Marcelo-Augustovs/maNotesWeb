import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TableData } from '../../services/table.service';

@Component({
  selector: 'app-dynamic-table',
  standalone: true,
  imports: [CommonModule, FormsModule, MatButtonModule, MatIconModule],
  templateUrl: './dynamic-table.component.html',
  styleUrl: './dynamic-table.component.scss'
})
export class DynamicTableComponent {
  @Input() table!: TableData;
  @Output() tableChange = new EventEmitter<TableData>();
  @Output() close = new EventEmitter<void>();

  addColumn() {
    if (!this.table) return;
    const colIndex = this.table.columns.length + 1;
    this.table.columns.push({
      label: `Coluna ${colIndex}`,
      field: `col${colIndex}`
    });
    this.save();
  }

  removeColumn(index: number) {
    if (!this.table) return;
    if (confirm('Remover esta coluna e seus dados?')) {
      this.table.columns.splice(index, 1);
      this.save();
    }
  }

  addRow() {
    if (!this.table) return;
    const newRow: any = { id: Date.now() };
    this.table.columns.forEach((col: any) => {
      newRow[col.field] = '';
    });
    this.table.rows.push(newRow);
    this.save();
  }

  removeRow(index: number) {
    if (!this.table) return;
    this.table.rows.splice(index, 1);
    this.save();
  }

  save() {
    this.tableChange.emit(this.table);
  }

  onClose() {
    this.close.emit();
  }
}
