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

export interface Item {
  id: Number;
  name: string; // Corresponds to DataTypes.STRING
  manufacturer: string; // Corresponds to DataTypes.STRING
  link?: string; // Corresponds to DataTypes.STRING (optional)
  dateAcquired: Date; // Corresponds to DataTypes.DATE
  priceBought: number; // Corresponds to DataTypes.FLOAT
  condition: Condition; // Corresponds to DataTypes.STRING (with enum values)
  status: Status; // Corresponds to DataTypes.STRING (with enum values)
  notes?: string; // Corresponds to DataTypes.STRING (optional)
  warranty?: string; // Corresponds to DataTypes.STRING (optional)
  trackingCode: string; // Corresponds to DataTypes.STRING (unique)
}
