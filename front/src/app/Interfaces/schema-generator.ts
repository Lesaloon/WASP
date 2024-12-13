import { Type } from '@angular/core';
import { Item, Part, Magazine, Accessory, Weapon } from './item.interface';

type SchemaType = 'Item' | 'Part' | 'Magazine' | 'Accessory' | 'Weapon';
export interface Schema {
  $schema: string;
  title: string;
  type: string;
  extending?: SchemaType;
  properties: Record<string, any>;
  required: string[];
  showInTable: string[];
}

const schemas: Record<SchemaType, object> = {
  Item: {
    $schema: 'http://json-schema.org/draft-07/schema#',
    title: 'Item',
    type: 'object',
    properties: {
    //   id: { type: 'number', required: true, label: 'ID' },
      name: { type: 'string', required: true, label: 'Name' },
      manufacturer: { type: 'string', required: true, label: 'Manufacturer' },
      link: { type: 'string', label: 'Link' },
      dateAcquired: { type: 'date', required: true, label: 'Date Acquired' },
      priceBought: { type: 'number', required: true, label: 'Price Bought' },
      condition: { type: 'string', enum: ['new', 'used', 'refurbished'], required: true, label: 'Condition' },
      status: { type: 'string', enum: ['in_use', 'out_of_use', 'in_repair'], required: true, label: 'Status' },
      notes: { type: 'string', label: 'Notes' },
      warranty: { type: 'string', label: 'Warranty' },
    //   trackingCode: { type: 'string', required: true, label: 'Tracking Code' },
    },
    showInTable: [
      'name',
      'manufacturer',
      'dateAcquired',
      'priceBought',
      'condition',
      'status',
      'trackingCode',
    ],
  },
  Part: {
    $schema: 'http://json-schema.org/draft-07/schema#',
    title: 'Part',
    type: 'object',
    properties: {
      // ...existing properties from Item
      type: { type: 'string', required: true, label: 'Type' },
      compatibleModels: { type: 'string', label: 'Compatible Models' },
      weaponId: { type: 'number', label: 'Weapon ID', foreignKey: 'Weapon' },
    },
    extending: 'Item',
    showInTable: [
      'name',
      'manufacturer',
      'dateAcquired',
      'priceBought',
      'condition',
      'status',
      'trackingCode',
    ],
  },
  Magazine: {
    $schema: 'http://json-schema.org/draft-07/schema#',
    title: 'Magazine',
    type: 'object',
    properties: {
      // ...existing properties from Accessory
      type: { type: 'string', required: true, label: 'Type' },
      capacity: { type: 'number', required: true, label: 'Capacity' },
      caliberGauge: { type: 'string', required: true, label: 'Caliber Gauge' },
    },
    extending: 'Item',
    showInTable: [
      'name',
      'manufacturer',
      'dateAcquired',
      'priceBought',
      'condition',
      'status',
      'trackingCode',
      'type',
      'capacity',
      'caliberGauge',
    ],
  },
  Accessory: {
    $schema: 'http://json-schema.org/draft-07/schema#',
    title: 'Accessory',
    type: 'object',
    properties: {
      // ...existing properties from Item
      type: { type: 'string', required: true, label: 'Type' },
      weaponId: { type: 'number', label: 'Weapon ID', foreignKey: 'Weapon' },
    },
    extending: 'Item',
    showInTable: [
      'name',
      'manufacturer',
      'dateAcquired',
      'priceBought',
      'condition',
      'status',
      'trackingCode',
      'type',
    ],
  },
  Weapon: {
    $schema: 'http://json-schema.org/draft-07/schema#',
    title: 'Weapon',
    type: 'object',
    properties: {
      // ...existing properties from Item
      category: { type: 'string', required: true, label: 'Category' },
      subcategory: { type: 'string', label: 'Subcategory' },
      legalCategory: { type: 'string', enum: ['A1', 'A2', 'B', 'C', 'D'], required: true, label: 'Legal Category' },
      SIAExpireDate: { type: 'string', format: 'date-time', label: 'SIA Expire Date' },
      model: { type: 'string', required: true, label: 'Model' },
      serialNumber: { type: 'string', required: true, label: 'Serial Number' },
      caliberGauge: { type: 'string', required: true, label: 'Caliber Gauge' },
      barelLength: { type: 'string', required: true, label: 'Barrel Length' },
      actionType: { type: 'string', required: true, label: 'Action Type' },
      countryOfOrigin: { type: 'string', required: true, label: 'Country of Origin' },
    },
    extending: 'Item',
    showInTable: [
      'name',
      'manufacturer',
      'dateAcquired',
      'priceBought',
      'condition',
      'status',
      'trackingCode',
      'category',
      'model',
      'serialNumber',
      'caliberGauge',
      'barelLength',
      'actionType',
      'countryOfOrigin',
    ],
  },
};

export function getSchema(type: SchemaType): Schema {
  let schema = schemas[type] as Schema;
  // if the schema extends another schema, merge the two
  // exept the showInTable property, which should stay the same
  if (schema.extending) {
    let extendingSchema = schemas[schema.extending] as Schema;
    schema = {
      ...extendingSchema,
      ...schema,
      showInTable: extendingSchema.showInTable,
    };
  }

  return schema;
}

export function getSchemaFromType<T>(): Schema {
  if (Type.prototype.toString() === 'Part') return getSchema('Part');
  if (Type.prototype.toString() === 'Magazine') return getSchema('Magazine');
  if (Type.prototype.toString() === 'Accessory') return getSchema('Accessory');
  if (Type.prototype.toString() === 'Weapon') return getSchema('Weapon');

  return getSchema('Item');
}
