import { Routes } from '@angular/router';
import { DashBordComponent } from './features/dash-bord/dash-bord.component';
import { NotesComponent } from './features/notes/notes.component';
import { FoodControlComponent } from './features/food-control/food-control.component';
import { PhysicalActivityComponent } from './features/physical-activity/physical-activity.component';
import { LoginComponent } from '../auth/login/login.component';
import { authGuard } from '../auth/auth.guard';
import { EventsComponent } from './features/events/events.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    component: DashBordComponent,
    canActivate: [authGuard]
  },
  {
    path: 'dashboard',
    component: DashBordComponent,
    canActivate: [authGuard]
  },
  {
    path: 'notes',
    component: NotesComponent,
    canActivate: [authGuard]
  },
  {
    path: 'food-control',
    component: FoodControlComponent,
    canActivate: [authGuard]
  },
  {
    path: 'physical-activity',
    component: PhysicalActivityComponent,
    canActivate: [authGuard]
  },
  {
    path: 'events',
    component: EventsComponent,
    canActivate: [authGuard]
  },
  {
    path: '**',
    redirectTo: ''
  }
];