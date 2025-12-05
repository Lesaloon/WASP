import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ItemBase, Weapon, Part, Accessory, ItemCondition, ItemStatus, ItemType, PlatformType } from '../../interfaces/item.interface';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css']
})
export class DynamicFormComponent implements OnInit {
  @Input() item: ItemBase | null = null;
  @Input() itemType: ItemType = ItemType.Weapon;
  @Output() formSubmit = new EventEmitter<ItemBase>();
  @Output() formCancel = new EventEmitter<void>();

  form!: FormGroup;
  itemTypes = Object.values(ItemType);
  conditions = Object.values(ItemCondition);
  statuses = Object.values(ItemStatus);
  platforms = Object.values(PlatformType);

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.buildForm();
    if (this.item) {
      this.form.patchValue(this.item);
    }
  }

  buildForm(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      manufacturer: [''],
      dateAcquired: [''],
      price: [''],
      condition: [ItemCondition.Unknown],
      status: [ItemStatus.Active],
      notes: [''],
      warrantyInfo: [''],
      trackingCode: [''],
      itemType: [this.itemType],
      tagIds: [[]]
    });

    // Add type-specific fields based on item type
    switch (this.itemType) {
      case ItemType.Weapon:
        this.form.addControl('platform', this.fb.control(PlatformType.Airsoft, Validators.required));
        this.form.addControl('category', this.fb.control('', Validators.required));
        this.form.addControl('subcategory', this.fb.control(''));
        this.form.addControl('model', this.fb.control('', Validators.required));
        this.form.addControl('serialNumber', this.fb.control(''));
        this.form.addControl('caliberOrBbSize', this.fb.control(''));
        this.form.addControl('actionType', this.fb.control(''));
        this.form.addControl('countryOfOrigin', this.fb.control(''));
        this.form.addControl('parts', this.fb.control([]));
        this.form.addControl('accessories', this.fb.control([]));
        break;

      case ItemType.Part:
        this.form.addControl('platform', this.fb.control(PlatformType.Airsoft, Validators.required));
        this.form.addControl('partType', this.fb.control('', Validators.required));
        this.form.addControl('compatibleModelsRaw', this.fb.control(''));
        this.form.addControl('weapons', this.fb.control([]));
        break;

      case ItemType.Accessory:
        this.form.addControl('platform', this.fb.control(PlatformType.Airsoft, Validators.required));
        this.form.addControl('accessoryType', this.fb.control('', Validators.required));
        this.form.addControl('weapons', this.fb.control([]));
        break;
    }
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.formSubmit.emit(this.form.value);
    }
  }

  onCancel(): void {
    this.formCancel.emit();
  }

  get isWeapon(): boolean {
    return this.itemType === ItemType.Weapon;
  }

  get isPart(): boolean {
    return this.itemType === ItemType.Part;
  }

  get isAccessory(): boolean {
    return this.itemType === ItemType.Accessory;
  }
}
