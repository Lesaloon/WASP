enum Condition {
  NEW = 'new',
  USED = 'used',
  REFURBISHED = 'refurbished',
}

enum Status {
  IN_USE = 'in_use',
  OUT_OF_USE = 'out_of_use',
  IN_REPAIR = 'in_repair',
}

export class Item {
  id!: number;
  name!: string;
  manufacturer!: string;
  link?: string;
  dateAcquired!: Date;
  priceBought!: number;
  condition!: Condition;
  status!: Status;
  notes?: string;
  warranty?: string;
  trackingCode!: string;
  [key: string]: any;
}

export class Part extends Item {
  type!: string;
  compatibleModels?: string;
  weaponId?: number;
}

export class Accessory extends Item {
  type!: string;
  weaponId?: number;
}

export class Magazine extends Accessory {
  capacity!: number;
  caliberGauge!: string;
}

export class Weapon extends Item {
  category!: string;
  subcategory?: string;
  legalCategory!: 'A1' | 'A2' | 'B' | 'C' | 'D';
  SIAExpireDate?: Date;
  model!: string;
  serialNumber!: string;
  caliberGauge!: string;
  barelLength!: string;
  actionType!: string;
  countryOfOrigin!: string;
}
