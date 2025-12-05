import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth-guard.guard';
import { LoginComponent } from './pages/login/login.component';
import { AccueilComponent } from './pages/accueil/accueil.component';
import { AllItemsComponent } from './pages/all-items/all-items.component';

export const routes: Routes = [
  { path: '', redirectTo: '/accueil', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { 
    path: 'accueil', 
    component: AccueilComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Admin', 'Technician', 'Viewer'] }
  },
  { 
    path: 'items', 
    component: AllItemsComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Admin', 'Technician', 'Viewer'] }
  },
  { 
    path: 'weapons', 
    component: AllItemsComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Admin', 'Technician', 'Viewer'] }
  },
  { 
    path: 'parts', 
    component: AllItemsComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Admin', 'Technician', 'Viewer'] }
  },
  { 
    path: 'accessories', 
    component: AllItemsComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Admin', 'Technician', 'Viewer'] }
  },
  { 
    path: 'maintenance', 
    component: AllItemsComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Admin', 'Technician'] }
  },
  { 
    path: 'tags', 
    component: AllItemsComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Admin'] }
  },
  { path: '**', redirectTo: '/accueil' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
