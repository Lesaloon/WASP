import { Component, inject, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DialogService, DialogRef, DialogCloseDirective } from '@ngneat/dialog';
import { Item } from '../../Interfaces/item.interface';
import { getSchemaFromType, Schema } from '../../Interfaces/schema-generator';

interface Data {
  schema: any;
}

@Component({
  selector: 'app-dynamic-form',
  standalone: true,
  imports: [DialogCloseDirective, ReactiveFormsModule, FormsModule],
  templateUrl: './dynamic-form.component.html',
  styleUrl: './dynamic-form.component.css',
})
export class DynamicFormComponent<T extends Item> implements OnInit {
  defaultValues: any = {};
  form!: FormGroup;
  fields: any[] = [];
  schema!: Schema;
  ref: DialogRef<Data, string> = inject(DialogRef);

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.defaultValues = this.ref.data;
    this.buildForm();
  }

  close() {
    this.ref.close();
  }

  buildForm() {
    const formGroup: any = {};
	this.schema = getSchemaFromType<T>();;
    this.fields = Object.keys(this.schema.properties).map((key) => {
      const property = this.schema.properties[key] as any;
      const validators = [];

      if (property.required) {
        validators.push(Validators.required);
      }

      if (property.pattern) {
        validators.push(Validators.pattern(property.pattern));
      }

      if (property.minLength) {
        validators.push(Validators.minLength(property.minLength));
      }

      if (property.maxLength) {
        validators.push(Validators.maxLength(property.maxLength));
      }

      formGroup[key] = [this.defaultValues[key] || '', validators];

      return {
        name: key,
        label: property.label || key.charAt(0).toUpperCase() + key.slice(1),
        type: property.enum ? 'select' : property.type,
        placeholder: `Enter ${property.label || key}`,
        options: property.enum || [],
      };
    });

    this.form = this.fb.group(formGroup);
  }

  onSubmit() {
    if (this.form.valid) {
      console.log('Form Submitted:', this.form.value);
    } else {
      console.error('Form is invalid!');
    }
  }
}
