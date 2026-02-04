import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HabitsComponent } from './components/habits/habits.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/habits', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'habits', component: HabitsComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: '/habits' }
];
