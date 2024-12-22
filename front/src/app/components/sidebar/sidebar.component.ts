import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
@Component({
	selector: 'sidebar',
	standalone: true,
	imports: [],
	templateUrl: './sidebar.component.html',
	styleUrl: './sidebar.component.css',
})
export class SidebarComponent implements OnInit {
	isLoggedIn: boolean = false;
	isSidebarOpen: boolean = false;

	constructor(private authService: AuthService) {}

	ngOnInit(): void {
		this.isLoggedIn = this.authService.isLoggedIn();
	}

	toggleSidebar(): void {
		this.isSidebarOpen = !this.isSidebarOpen;
	}
}
