import { Component, inject, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Item } from '../../interfaces/item.interface';
import { DialogService } from '@ngneat/dialog';
import { DynamicFormComponent } from '../dynamic-form/dynamic-form.component';
import { getSchema, getSchemaFromType, Schema, SchemaType } from '../../interfaces/schema-generator';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
})
export class TableComponent<T extends Item> implements OnInit {
  @Input()
  data: T[] = [];
  filterText: string = '';
  @Input()
  type!: string;
  schema!: Schema;
  loading = true;

  constructor(private dialog: DialogService) {}

  get filteredData(): Array<T> {
    return this.data.filter((item: T) =>
      item.name.toLowerCase().includes(this.filterText.toLowerCase())
    );
  }

  ngOnInit(): void {
    this.schema = getSchema(this.type as SchemaType);
    this.loading = false;
    console.log(this.schema);
  }

  addData() {
    this.dialog.open(DynamicFormComponent, {
      data: {
        schema: this.schema,
      },
    });
  }
}

