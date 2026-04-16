import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-side-menu',
  imports: [RouterModule, CommonModule, MatListModule, MatIconModule],
  standalone: true,
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.scss'
})
export class SideMenuComponent {

  menuItems = [
    { path: '/dashboard', icon: 'dashboard', label: 'Dashboard' },
    { path: '/notes', icon: 'edit_note', label: 'Anotações' },
    { path: '/expenses', icon: 'account_balance_wallet', label: 'Despesas' },
    { path: '/events', icon: 'event', label: 'Eventos' },
    { path: '/food-control', icon: 'kitchen', label: 'Controle Alimentar' },
    { path: '/physical-activity', icon: 'fitness_center', label: 'Treinos' }
  ];

}
