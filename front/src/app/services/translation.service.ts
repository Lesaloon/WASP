import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private translations: { [key: string]: string } = {
    // Navigation
    'nav.home': 'Home',
    'nav.items': 'Items',
    'nav.weapons': 'Weapons',
    'nav.parts': 'Parts',
    'nav.accessories': 'Accessories',
    'nav.maintenance': 'Maintenance',
    'nav.tags': 'Tags',
    'nav.login': 'Login',
    'nav.logout': 'Logout',

    // Forms
    'form.title.create': 'Create',
    'form.title.edit': 'Edit',
    'form.title.view': 'View',
    'form.save': 'Save',
    'form.cancel': 'Cancel',
    'form.delete': 'Delete',
    'form.close': 'Close',

    // Fields
    'field.name': 'Name',
    'field.manufacturer': 'Manufacturer',
    'field.dateAcquired': 'Date Acquired',
    'field.price': 'Price',
    'field.condition': 'Condition',
    'field.status': 'Status',
    'field.notes': 'Notes',
    'field.warranty': 'Warranty',
    'field.trackingCode': 'Tracking Code',
    'field.platform': 'Platform',
    'field.category': 'Category',
    'field.subcategory': 'Subcategory',
    'field.model': 'Model',
    'field.serialNumber': 'Serial Number',
    'field.caliber': 'Caliber/BB Size',
    'field.actionType': 'Action Type',
    'field.countryOfOrigin': 'Country of Origin',
    'field.partType': 'Part Type',
    'field.compatibleModels': 'Compatible Models',
    'field.accessoryType': 'Accessory Type',
    'field.priority': 'Priority',
    'field.issueDescription': 'Issue Description',
    'field.assignedTo': 'Assigned To',
    'field.resolutionSteps': 'Resolution Steps',
    'field.tagName': 'Tag Name',

    // Statuses
    'status.active': 'Active',
    'status.inUse': 'In Use',
    'status.retired': 'Retired',
    'status.underMaintenance': 'Under Maintenance',
    'status.pending': 'Pending',
    'status.inProgress': 'In Progress',
    'status.resolved': 'Resolved',

    // Conditions
    'condition.unknown': 'Unknown',
    'condition.new': 'New',
    'condition.used': 'Used',
    'condition.refurbished': 'Refurbished',

    // Platforms
    'platform.airsoft': 'Airsoft',
    'platform.realSteel': 'Real Steel',
    'platform.trainingReplica': 'Training Replica',
    'platform.other': 'Other',

    // Priorities
    'priority.low': 'Low',
    'priority.medium': 'Medium',
    'priority.high': 'High',
    'priority.critical': 'Critical',

    // Actions
    'action.create': 'Create',
    'action.update': 'Update',
    'action.delete': 'Delete',
    'action.view': 'View',
    'action.edit': 'Edit',
    'action.link': 'Link',
    'action.unlink': 'Unlink',
    'action.mount': 'Mount',
    'action.unmount': 'Unmount',
    'action.addMaintenance': 'Add Maintenance',
    'action.addTag': 'Add Tag',

    // Messages
    'message.success.created': 'Created successfully',
    'message.success.updated': 'Updated successfully',
    'message.success.deleted': 'Deleted successfully',
    'message.error.create': 'Error creating item',
    'message.error.update': 'Error updating item',
    'message.error.delete': 'Error deleting item',
    'message.error.load': 'Error loading data',
    'message.noData': 'No data available',
    'message.loading': 'Loading...',
    'message.search': 'Search...',
    'message.filter': 'Filter',
    'message.clear': 'Clear',

    // Tables
    'table.actions': 'Actions',
    'table.name': 'Name',
    'table.manufacturer': 'Manufacturer',
    'table.type': 'Type',
    'table.platform': 'Platform',
    'table.status': 'Status',
    'table.condition': 'Condition',
    'table.category': 'Category',
    'table.model': 'Model',
    'table.trackingCode': 'Tracking Code',
    'table.createdAt': 'Created At',
    'table.updatedAt': 'Updated At'
  };

  translate(key: string): string {
    return this.translations[key] || key;
  }

  translateList(keys: string[]): string[] {
    return keys.map(key => this.translate(key));
  }
}
