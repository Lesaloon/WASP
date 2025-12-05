import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { ItemBase, Weapon, Part, Accessory, ItemType } from '../../interfaces/item.interface';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  @Input() items: ItemBase[] = [];
  @Input() itemType: ItemType = ItemType.Weapon;
  @Input() loading: boolean = false;
  @Output() viewItem = new EventEmitter<ItemBase>();
  @Output() editItem = new EventEmitter<ItemBase>();
  @Output() deleteItem = new EventEmitter<ItemBase>();
  @Output() pageChange = new EventEmitter<number>();

  currentPage: number = 1;
  pageSize: number = 10;

  ngOnInit(): void {}

  onView(item: ItemBase): void {
    this.viewItem.emit(item);
  }

  onEdit(item: ItemBase): void {
    this.editItem.emit(item);
  }

  onDelete(item: ItemBase): void {
    if (confirm('Are you sure you want to delete this item?')) {
      this.deleteItem.emit(item);
    }
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.pageChange.emit(page);
  }

  get displayedColumns(): string[] {
    switch (this.itemType) {
      case ItemType.Weapon:
        return ['name', 'manufacturer', 'category', 'model', 'platform', 'status', 'condition', 'trackingCode', 'actions'];
      case ItemType.Part:
        return ['name', 'manufacturer', 'partType', 'platform', 'status', 'condition', 'trackingCode', 'actions'];
      case ItemType.Accessory:
        return ['name', 'manufacturer', 'accessoryType', 'platform', 'status', 'condition', 'trackingCode', 'actions'];
      default:
        return ['name', 'manufacturer', 'status', 'condition', 'trackingCode', 'actions'];
    }
  }

  formatValue(item: ItemBase, column: string): string {
    switch (column) {
      case 'name':
        return item.name;
      case 'manufacturer':
        return item.manufacturer || '-';
      case 'category':
        return (item as Weapon).category || '-';
      case 'model':
        return (item as Weapon).model || '-';
      case 'partType':
        return (item as Part).partType || '-';
      case 'accessoryType':
        return (item as Accessory).accessoryType || '-';
      case 'platform':
        return (item as any).platform || '-';
      case 'status':
        return item.status;
      case 'condition':
        return item.condition;
      case 'trackingCode':
        return item.trackingCode;
      default:
        return '';
    }
  }
}
