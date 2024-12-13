import { Component, inject, Input } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DialogService, DialogRef, DialogCloseDirective } from '@ngneat/dialog';

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
export class DynamicFormComponent {
  schema: any = [];
  form!: FormGroup;
  fields: any[] = [];

  ref: DialogRef<Data, string> = inject(DialogRef);

  constructor(private fb: FormBuilder) {

  }

  ngOnInit(): void {
	this.schema = this.ref.data.schema;
    this.buildForm();
	console.log(this.schema);
  }

  close() {
    this.ref.close();
  }

  buildForm() {
    const formGroup: any = {};

    this.schema.forEach((field: any) => {
      const control = [field.default || '', []];
	  console.log(control);
      this.fields.push(field);
      if (field.required) {
        control[1].push(Validators.required);
      }

      if (field.type === 'email') {
        control[1].push(Validators.email);
      }

      if (field.minLength) {
        control[1].push(Validators.minLength(field.minLength));
      }

      if (field.maxLength) {
        control[1].push(Validators.maxLength(field.maxLength));
      }

      formGroup[field.name] = control;
    });
	console.log(formGroup);
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
