import { Component, inject, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Item } from '../../Interfaces/item.interface';
import { DialogService } from '@ngneat/dialog';
import { DynamicFormComponent } from '../dynamic-form/dynamic-form.component';
import { getSchemaFromType } from '../../Interfaces/schema-generator';
@Component({
  selector: 'app-table',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
})
export class TableComponent<T extends Item> {
  @Input()
  data: Array<Item> = [];
  filterText: string = '';

  constructor(private dialog: DialogService) {}

  get filteredData(): Array<Item> {
    return this.data.filter((item: Item) =>
      item.name.toLowerCase().includes(this.filterText.toLowerCase())
    );
  }
  addData() {


    this.dialog.open(DynamicFormComponent, {
      data: {
        schema: getSchemaFromType<T>(),
      },
    });
  }
}
