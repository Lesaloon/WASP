export type SchemaType = 'Item' | 'Part' | 'Magazine' | 'Accessory' | 'Weapon';
export interface Schema {
  $schema: string;
  title: string;
  type: string;
  extending?: SchemaType;
  properties: Record<string, any>;
  required: string[];
  showInTable: Array<{ key: string; label: string }>;
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
      condition: {
        type: 'string',
        enum: ['new', 'used', 'refurbished'],
        required: true,
        label: 'Condition',
      },
      status: {
        type: 'string',
        enum: ['in_use', 'out_of_use', 'in_repair'],
        required: true,
        label: 'Status',
      },
      notes: { type: 'string', label: 'Notes' },
      warranty: { type: 'string', label: 'Warranty' },
      //   trackingCode: { type: 'string', required: true, label: 'Tracking Code' },
    },
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
    $schema: 'http://json-schema.org/draft-07/schema#',
    title: 'Weapon',
    type: 'object',
    properties: {
      // ...existing properties from Item
      category: { type: 'string', required: true, label: 'Category' },
      subcategory: { type: 'string', label: 'Subcategory' },
      legalCategory: {
        type: 'string',
        enum: ['A1', 'A2', 'B', 'C', 'D'],
        required: true,
        label: 'Legal Category',
      },
      SIAExpireDate: {
        type: 'string',
        format: 'date-time',
        label: 'SIA Expire Date',
      },
      model: { type: 'string', required: true, label: 'Model' },
      serialNumber: { type: 'string', required: true, label: 'Serial Number' },
      caliberGauge: { type: 'string', required: true, label: 'Caliber Gauge' },
      barelLength: { type: 'string', required: true, label: 'Barrel Length' },
      actionType: { type: 'string', required: true, label: 'Action Type' },
      countryOfOrigin: {
        type: 'string',
        required: true,
        label: 'Country of Origin',
      },
    },
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
  console.log(type);
  let schema = schemas[type] as Schema;
  // if the schema extends another schema, merge the two
  // exept the showInTable property, which should stay the same
  if (schema.extending) {
    let extendingSchema = schemas[schema.extending] as Schema;
    schema = {
      ...schema,
      properties: { ...schema.properties, ...extendingSchema.properties },
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
