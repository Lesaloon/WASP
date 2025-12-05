import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemBase, ItemType, ItemFilter, PagedResult } from '../../interfaces/item.interface';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-all-items',
  templateUrl: './all-items.component.html',
  styleUrls: ['./all-items.component.css']
})
export class AllItemsComponent implements OnInit {
  items: ItemBase[] = [];
  itemType: ItemType = ItemType.Weapon;
  loading: boolean = false;
  currentPage: number = 1;
  totalCount: number = 0;
  totalPages: number = 0;

  filter: ItemFilter = {
    page: 1,
    pageSize: 10
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.route.url.subscribe(url => {
      const path = url[0]?.path;
      this.itemType = this.getItemTypeFromPath(path);
      this.loadItems();
    });
  }

  getItemTypeFromPath(path: string | undefined): ItemType {
    switch (path) {
      case 'weapons':
        return ItemType.Weapon;
      case 'parts':
        return ItemType.Part;
      case 'accessories':
        return ItemType.Accessory;
      default:
        return ItemType.Weapon;
    }
  }

  loadItems(): void {
    this.loading = true;
    this.filter.type = this.itemType;
    this.filter.page = this.currentPage;

    this.apiService.getAllItems(this.filter).subscribe({
      next: (result: PagedResult<ItemBase>) => {
        this.items = result.items;
        this.totalCount = result.totalCount;
        this.totalPages = result.totalPages;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading items:', error);
        this.loading = false;
      }
    });
  }

  onSearch(searchTerm: string): void {
    this.filter.search = searchTerm;
    this.currentPage = 1;
    this.loadItems();
  }

  onFilterChange(filter: ItemFilter): void {
    this.filter = { ...this.filter, ...filter };
    this.currentPage = 1;
    this.loadItems();
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadItems();
  }

  onViewItem(item: ItemBase): void {
    // Navigate to detail view
    console.log('View item:', item);
  }

  onEditItem(item: ItemBase): void {
    // Navigate to edit form
    console.log('Edit item:', item);
  }

  onDeleteItem(item: ItemBase): void {
    this.apiService.deleteItem(item.id).subscribe({
      next: () => {
        this.loadItems();
      },
      error: (error) => {
        console.error('Error deleting item:', error);
      }
    });
  }

  onAddItem(): void {
    // Navigate to add form
    console.log('Add item');
  }

  get pageTitle(): string {
    return `${this.itemType}s`;
  }
}
