import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { UserDetailsComponent } from './pages/user-details/user-details.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'userDetails/:id', component: UserDetailsComponent },
  { path: '**', component: NotFoundComponent },
  { path: '', pathMatch: 'full', redirectTo: 'home' },
];
