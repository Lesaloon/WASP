import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Item } from '../../Interface/item.interface';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
})
export class TableComponent {
  @Input()
  data: Array<Item> = [];
  filterText: string = '';

  get filteredData(): Array<Item> {
    return this.data.filter((item: Item) =>
      item.name.toLowerCase().includes(this.filterText.toLowerCase())
    );
  }
}
