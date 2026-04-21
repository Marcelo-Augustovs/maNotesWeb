import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-button-add-painel',
  standalone: true,
  imports: [
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    CommonModule,
  ],
  templateUrl: './button-add-painel.component.html',
  styleUrl: './button-add-painel.component.scss'
})
export class ButtonAddPainelComponent {
  @Input() buttonList!: any[];

  @Output() addItem = new EventEmitter<void>();

  addItemEvent(button: any) {
    this.addItem.emit(button);
  }
}
