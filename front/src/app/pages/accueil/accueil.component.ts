import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { ItemBase, ItemType } from '../../interfaces/item.interface';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {
  totalItems: number = 0;
  totalWeapons: number = 0;
  totalParts: number = 0;
  totalAccessories: number = 0;

  recentItems: ItemBase[] = [];

  constructor(
    private router: Router,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    // Load summary statistics
    this.apiService.getAllItems({ page: 1, pageSize: 1 }).subscribe({
      next: (result) => {
        this.totalItems = result.totalCount;
      },
      error: (error) => {
        console.error('Error loading total items:', error);
      }
    });

    // Load recent items
    this.apiService.getAllItems({ page: 1, pageSize: 5 }).subscribe({
      next: (result) => {
        this.recentItems = result.items;
      },
      error: (error) => {
        console.error('Error loading recent items:', error);
      }
    });
  }

  navigateToItems(): void {
    this.router.navigate(['/items']);
  }

  navigateToWeapons(): void {
    this.router.navigate(['/weapons']);
  }

  navigateToParts(): void {
    this.router.navigate(['/parts']);
  }

  navigateToAccessories(): void {
    this.router.navigate(['/accessories']);
  }

  navigateToMaintenance(): void {
    this.router.navigate(['/maintenance']);
  }

  navigateToTags(): void {
    this.router.navigate(['/tags']);
  }
}
