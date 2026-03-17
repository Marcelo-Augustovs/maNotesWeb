import { Routes } from '@angular/router';
import { DashBordComponent } from './features/dash-bord/dash-bord.component';
import { NotesComponent } from './features/notes/notes.component';

export const routes: Routes = [

  {
    path: '',
    component: DashBordComponent
  },

  {
    path: 'dashboard',
    component: DashBordComponent
  },

  {
    path: 'notes',
    component: NotesComponent
  }

];