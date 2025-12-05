export enum ItemCondition {
  Unknown = 'Unknown',
  New = 'New',
  Used = 'Used',
  Refurbished = 'Refurbished'
}

export enum ItemStatus {
  Active = 'Active',
  InUse = 'InUse',
  Retired = 'Retired',
  UnderMaintenance = 'UnderMaintenance'
}

export enum ItemType {
  Weapon = 'Weapon',
  Part = 'Part',
  Accessory = 'Accessory'
}

export enum PlatformType {
  Airsoft = 'Airsoft',
  RealSteel = 'RealSteel',
  TrainingReplica = 'TrainingReplica',
  Other = 'Other'
}

export enum MaintenanceStatus {
  Pending = 'Pending',
  InProgress = 'InProgress',
  Resolved = 'Resolved'
}

export enum MaintenancePriority {
  Low = 'Low',
  Medium = 'Medium',
  High = 'High',
  Critical = 'Critical'
}

export interface ItemBase {
  id: string;
  name: string;
  manufacturer?: string;
  dateAcquired?: Date;
  price?: number;
  condition: ItemCondition;
  status: ItemStatus;
  notes?: string;
  warrantyInfo?: string;
  trackingCode: string;
  itemType: ItemType;
  tagIds: string[];
  createdAtUtc: Date;
  updatedAtUtc?: Date;
}

export interface Weapon extends ItemBase {
  platform: PlatformType;
  category: string;
  subcategory?: string;
  model: string;
  serialNumber?: string;
  caliberOrBbSize?: string;
  actionType?: string;
  countryOfOrigin?: string;
  parts: WeaponPart[];
  accessories: WeaponAccessory[];
}

export interface Part extends ItemBase {
  platform: PlatformType;
  partType: string;
  compatibleModelsRaw?: string;
  weapons: WeaponPart[];
}

export interface Accessory extends ItemBase {
  platform: PlatformType;
  accessoryType: string;
  weapons: WeaponAccessory[];
}

export interface WeaponPart {
  partId: string;
  partName: string;
  isCurrentlyInstalled: boolean;
  notes?: string;
}

export interface WeaponAccessory {
  accessoryId: string;
  accessoryName: string;
  isCurrentlyMounted: boolean;
  notes?: string;
}

export interface MaintenanceLog {
  id: string;
  itemId: string;
  itemName: string;
  priority: MaintenancePriority;
  issueDescription: string;
  status: MaintenanceStatus;
  assignedToUserId?: string;
  resolutionSteps?: string;
  dateLoggedUtc: Date;
  dateResolvedUtc?: Date;
  createdAtUtc: Date;
  updatedAtUtc?: Date;
}

export interface Tag {
  id: string;
  name: string;
  createdAtUtc: Date;
}

export interface PagedResult<T> {
  items: T[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface ItemFilter {
  type?: ItemType;
  platform?: PlatformType;
  status?: ItemStatus;
  category?: string;
  tags?: string[];
  search?: string;
  page?: number;
  pageSize?: number;
}

export interface CreateMaintenanceLog {
  itemId: string;
  priority: MaintenancePriority;
  issueDescription: string;
  assignedToUserId?: string;
}

export interface UpdateMaintenanceLog {
  status: MaintenanceStatus;
  resolutionSteps?: string;
  assignedToUserId?: string;
}

export interface LinkPart {
  isInstalled: boolean;
  notes?: string;
}

export interface LinkAccessory {
  isMounted: boolean;
  notes?: string;
}
