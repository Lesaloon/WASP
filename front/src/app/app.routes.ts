import { Routes } from '@angular/router';
import { AccueilComponent } from './pages/accueil/accueil.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './guard/auth-guard.guard';

export const routes: Routes = [
	{
		path: '',
		component: AccueilComponent,
		canActivate: [AuthGuard],
	},
	{
		path: 'login',
		component: LoginComponent,
	},
];
