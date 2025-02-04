export type SchemaType = 'Item' | 'Part' | 'Magazine' | 'Accessory' | 'Weapon';
export interface Schema {
  title: string;
  type: string;
  extending?: SchemaType;
  properties: Array<{ key: string; value: any }>;
  showInTable: Array<{ key: string; label: string }>;
}

const schemas: Record<SchemaType, object> = {
  Item: {
    title: 'Item',
    type: 'object',
    properties: [
      { key: 'name', value: { type: 'string', required: true, label: 'Name' } },
      { key: 'manufacturer', value: { type: 'string', required: true, label: 'Manufacturer' } },
      { key: 'link', value: { type: 'string', label: 'Link' } },
      { key: 'dateAcquired', value: { type: 'date', required: true, label: 'Date Acquired' } },
      { key: 'priceBought', value: { type: 'number', required: true, label: 'Price Bought' } },
      { key: 'condition', value: { type: 'string', enum: ['new', 'used', 'refurbished'], required: true, label: 'Condition' } },
      { key: 'status', value: { type: 'string', enum: ['in_use', 'out_of_use', 'in_repair'], required: true, label: 'Status' } },
      { key: 'notes', value: { type: 'string', label: 'Notes' } },
      { key: 'warranty', value: { type: 'string', label: 'Warranty' } },
    ],
    showInTable: [
      { key: 'name', label: 'Name' },
      { key: 'manufacturer', label: 'Manufacturer' },
      { key: 'dateAcquired', label: 'Date Acquired' },
      { key: 'priceBought', label: 'Price Bought' },
      { key: 'condition', label: 'Condition' },
      { key: 'status', label: 'Status' },
      { key: 'trackingCode', label: 'Tracking Code' },
    ],
  },
  Part: {
    title: 'Part',
    type: 'object',
    properties: [
      // ...existing properties from Item
      { key: 'type', value: { type: 'string', required: true, label: 'Type' } },
      { key: 'compatibleModels', value: { type: 'string', label: 'Compatible Models' } },
      { key: 'weaponId', value: { type: 'number', label: 'Weapon ID', foreignKey: 'Weapon' } },
    ],
    extending: 'Item',
    showInTable: [
      { key: 'name', label: 'Name' },
      { key: 'manufacturer', label: 'Manufacturer' },
      { key: 'dateAcquired', label: 'Date Acquired' },
      { key: 'priceBought', label: 'Price Bought' },
      { key: 'condition', label: 'Condition' },
      { key: 'status', label: 'Status' },
      { key: 'trackingCode', label: 'Tracking Code' },
    ],
  },
  Magazine: {
    title: 'Magazine',
    type: 'object',
    properties: [
      // ...existing properties from Accessory
      { key: 'type', value: { type: 'string', required: true, label: 'Type' } },
      { key: 'capacity', value: { type: 'number', required: true, label: 'Capacity' } },
      { key: 'caliberGauge', value: { type: 'string', required: true, label: 'Caliber Gauge' } },
    ],
    extending: 'Item',
    showInTable: [
      { key: 'name', label: 'Name' },
      { key: 'manufacturer', label: 'Manufacturer' },
      { key: 'dateAcquired', label: 'Date Acquired' },
      { key: 'priceBought', label: 'Price Bought' },
      { key: 'condition', label: 'Condition' },
      { key: 'status', label: 'Status' },
      { key: 'trackingCode', label: 'Tracking Code' },
      { key: 'type', label: 'Type' },
      { key: 'capacity', label: 'Capacity' },
      { key: 'caliberGauge', label: 'Caliber Gauge' },
    ],
  },
  Accessory: {
    title: 'Accessory',
    type: 'object',
    properties: [
      // ...existing properties from Item
      { key: 'type', value: { type: 'string', required: true, label: 'Type' } },
      { key: 'weaponId', value: { type: 'number', label: 'Weapon ID', foreignKey: 'Weapon' } },
    ],
    extending: 'Item',
    showInTable: [
      { key: 'name', label: 'Name' },
      { key: 'manufacturer', label: 'Manufacturer' },
      { key: 'dateAcquired', label: 'Date Acquired' },
      { key: 'priceBought', label: 'Price Bought' },
      { key: 'condition', label: 'Condition' },
      { key: 'status', label: 'Status' },
      { key: 'trackingCode', label: 'Tracking Code' },
      { key: 'type', label: 'Type' },
    ],
  },
  Weapon: {
    title: 'Weapon',
    type: 'object',
    properties: [
      // ...existing properties from Item
      { key: 'category', value: { type: 'string', required: true, label: 'Category' } },
      { key: 'subcategory', value: { type: 'string', label: 'Subcategory' } },
      { key: 'legalCategory', value: { type: 'string', enum: ['A1', 'A2', 'B', 'C', 'D'], required: true, label: 'Legal Category' } },
      { key: 'SIAExpireDate', value: { type: 'string', format: 'date-time', label: 'SIA Expire Date' } },
      { key: 'model', value: { type: 'string', required: true, label: 'Model' } },
      { key: 'serialNumber', value: { type: 'string', required: true, label: 'Serial Number' } },
      { key: 'caliberGauge', value: { type: 'string', required: true, label: 'Caliber Gauge' } },
      { key: 'barelLength', value: { type: 'string', required: true, label: 'Barrel Length' } },
      { key: 'actionType', value: { type: 'string', required: true, label: 'Action Type' } },
      { key: 'countryOfOrigin', value: { type: 'string', required: true, label: 'Country of Origin' } },
    ],
    extending: 'Item',
    showInTable: [
      { key: 'name', label: 'Name' },
      { key: 'manufacturer', label: 'Manufacturer' },
      { key: 'dateAcquired', label: 'Date Acquired' },
      { key: 'priceBought', label: 'Price Bought' },
      { key: 'condition', label: 'Condition' },
      { key: 'status', label: 'Status' },
      { key: 'trackingCode', label: 'Tracking Code' },
      { key: 'category', label: 'Category' },
      { key: 'model', label: 'Model' },
      { key: 'serialNumber', label: 'Serial Number' },
      { key: 'caliberGauge', label: 'Caliber Gauge' },
      { key: 'barelLength', label: 'Barrel Length' },
      { key: 'actionType', label: 'Action Type' },
      { key: 'countryOfOrigin', label: 'Country of Origin' },
    ],
  },
};

export function getSchema(type: SchemaType): Schema {
  let schema = schemas[type] as Schema;
  let og = schema;

  // if the schema extends another schema, merge the two
  // except the showInTable property, which should stay the same
  if (schema.extending) {
    let extendingSchema = schemas[schema.extending] as Schema;
    schema = {
      ...schema,
      properties: [...extendingSchema.properties, ...schema.properties],
      showInTable: schema.showInTable,
    };
  }

  return schema;
}

export function getSchemaFromType<T>(type: { new (): T } | Function): Schema {
  if (!type || typeof type !== 'function') {
    throw new Error(
      `Input must be a class constructor, received: ${typeof type}`
    );
  }

  const className = type.name;

  return getSchema(className as SchemaType);
}
