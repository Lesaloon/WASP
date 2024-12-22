import { Routes } from '@angular/router';
import { AccueilComponent } from './pages/accueil/accueil.component';
import { LoginComponent } from './pages/login/login.component';

export const routes: Routes = [
	{
		path: '',
		component: AccueilComponent,
	},
	{
		path: 'login',
		component: LoginComponent,
	},
];
