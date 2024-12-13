import { Component, inject, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Item } from '../../Interface/item.interface';
import { DialogService } from '@ngneat/dialog';
import { DynamicFormComponent } from '../dynamic-form/dynamic-form.component';
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

  constructor(private dialog: DialogService) {}

  get filteredData(): Array<Item> {
    return this.data.filter((item: Item) =>
      item.name.toLowerCase().includes(this.filterText.toLowerCase())
    );
  }
  addData() {
    this.dialog.open(DynamicFormComponent, {
      data: {
        schema: [
          {
            name: 'email',
            type: 'email',
            label: 'Email Address',
            required: true,
            placeholder: 'Enter your email',
          },
          {
            name: 'password',
            type: 'password',
            label: 'Password',
            required: true,
            minLength: 6,
            placeholder: 'Enter your password',
          },
          {
            name: 'bio',
            type: 'textarea',
            label: 'Bio',
            required: false,
            maxLength: 200,
            placeholder: 'Write about yourself',
          },
        ],
      },
    });
  }
}
