import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';
import { 
  Weapon, 
  Part, 
  Accessory, 
  ItemBase, 
  MaintenanceLog, 
  Tag, 
  PagedResult, 
  ItemFilter, 
  CreateMaintenanceLog, 
  UpdateMaintenanceLog, 
  LinkPart, 
  LinkAccessory,
  ItemType
} from '../interfaces/item.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpService) {}

  // Items
  getAllItems(filter: ItemFilter): Observable<PagedResult<ItemBase>> {
    const params = this.buildFilterParams(filter);
    return this.http.get<PagedResult<ItemBase>>(`items?${params}`);
  }

  getItemById(id: string): Observable<ItemBase> {
    return this.http.get<ItemBase>(`items/${id}`);
  }

  createItem(item: ItemBase): Observable<ItemBase> {
    return this.http.post<ItemBase>('items', item);
  }

  updateItem(id: string, item: ItemBase): Observable<ItemBase> {
    return this.http.put<ItemBase>(`items/${id}`, item);
  }

  deleteItem(id: string): Observable<void> {
    return this.http.delete<void>(`items/${id}`);
  }

  // Weapons
  getAllWeapons(filter: ItemFilter): Observable<PagedResult<Weapon>> {
    const params = this.buildFilterParams({ ...filter, type: ItemType.Weapon });
    return this.http.get<PagedResult<Weapon>>(`weapons?${params}`);
  }

  getWeaponById(id: string): Observable<Weapon> {
    return this.http.get<Weapon>(`weapons/${id}`);
  }

  createWeapon(weapon: Weapon): Observable<Weapon> {
    return this.http.post<Weapon>('weapons', weapon);
  }

  updateWeapon(id: string, weapon: Weapon): Observable<Weapon> {
    return this.http.put<Weapon>(`weapons/${id}`, weapon);
  }

  deleteWeapon(id: string): Observable<void> {
    return this.http.delete<void>(`weapons/${id}`);
  }

  // Parts
  getAllParts(filter: ItemFilter): Observable<PagedResult<Part>> {
    const params = this.buildFilterParams({ ...filter, type: ItemType.Part });
    return this.http.get<PagedResult<Part>>(`parts?${params}`);
  }

  getPartById(id: string): Observable<Part> {
    return this.http.get<Part>(`parts/${id}`);
  }

  createPart(part: Part): Observable<Part> {
    return this.http.post<Part>('parts', part);
  }

  updatePart(id: string, part: Part): Observable<Part> {
    return this.http.put<Part>(`parts/${id}`, part);
  }

  deletePart(id: string): Observable<void> {
    return this.http.delete<void>(`parts/${id}`);
  }

  // Accessories
  getAllAccessories(filter: ItemFilter): Observable<PagedResult<Accessory>> {
    const params = this.buildFilterParams({ ...filter, type: ItemType.Accessory });
    return this.http.get<PagedResult<Accessory>>(`accessories?${params}`);
  }

  getAccessoryById(id: string): Observable<Accessory> {
    return this.http.get<Accessory>(`accessories/${id}`);
  }

  createAccessory(accessory: Accessory): Observable<Accessory> {
    return this.http.post<Accessory>('accessories', accessory);
  }

  updateAccessory(id: string, accessory: Accessory): Observable<Accessory> {
    return this.http.put<Accessory>(`accessories/${id}`, accessory);
  }

  deleteAccessory(id: string): Observable<void> {
    return this.http.delete<void>(`accessories/${id}`);
  }

  // Weapon relationships
  linkPartToWeapon(weaponId: string, partId: string, linkData: LinkPart): Observable<void> {
    return this.http.post<void>(`weapons/${weaponId}/parts/${partId}`, linkData);
  }

  unlinkPartFromWeapon(weaponId: string, partId: string): Observable<void> {
    return this.http.delete<void>(`weapons/${weaponId}/parts/${partId}`);
  }

  linkAccessoryToWeapon(weaponId: string, accessoryId: string, linkData: LinkAccessory): Observable<void> {
    return this.http.post<void>(`weapons/${weaponId}/accessories/${accessoryId}`, linkData);
  }

  unlinkAccessoryFromWeapon(weaponId: string, accessoryId: string): Observable<void> {
    return this.http.delete<void>(`weapons/${weaponId}/accessories/${accessoryId}`);
  }

  // Maintenance
  getAllMaintenanceLogs(filter: { page?: number; pageSize?: number; status?: string; priority?: string; itemId?: string }): Observable<PagedResult<MaintenanceLog>> {
    const params = new URLSearchParams();
    if (filter.page) params.append('page', filter.page.toString());
    if (filter.pageSize) params.append('pageSize', filter.pageSize.toString());
    if (filter.status) params.append('status', filter.status);
    if (filter.priority) params.append('priority', filter.priority);
    if (filter.itemId) params.append('itemId', filter.itemId);
    return this.http.get<PagedResult<MaintenanceLog>>(`maintenance?${params}`);
  }

  getMaintenanceLogById(id: string): Observable<MaintenanceLog> {
    return this.http.get<MaintenanceLog>(`maintenance/${id}`);
  }

  createMaintenanceLog(maintenance: CreateMaintenanceLog): Observable<MaintenanceLog> {
    return this.http.post<MaintenanceLog>('maintenance', maintenance);
  }

  updateMaintenanceLog(id: string, maintenance: UpdateMaintenanceLog): Observable<MaintenanceLog> {
    return this.http.put<MaintenanceLog>(`maintenance/${id}`, maintenance);
  }

  deleteMaintenanceLog(id: string): Observable<void> {
    return this.http.delete<void>(`maintenance/${id}`);
  }

  // Tags
  getAllTags(): Observable<Tag[]> {
    return this.http.get<Tag[]>('tags');
  }

  createTag(tag: { name: string }): Observable<Tag> {
    return this.http.post<Tag>('tags', tag);
  }

  addTagToItem(itemId: string, tagId: string): Observable<void> {
    return this.http.post<void>(`items/${itemId}/tags`, { tagId });
  }

  removeTagFromItem(itemId: string, tagId: string): Observable<void> {
    return this.http.delete<void>(`items/${itemId}/tags/${tagId}`);
  }

  // Activity logs
  getItemActivity(itemId: string, page: number = 1, pageSize: number = 10): Observable<MaintenanceLog[]> {
    return this.http.get<MaintenanceLog[]>(`items/${itemId}/activity?page=${page}&pageSize=${pageSize}`);
  }

  private buildFilterParams(filter: ItemFilter): string {
    const params = new URLSearchParams();
    if (filter.type) params.append('type', filter.type);
    if (filter.platform) params.append('platform', filter.platform);
    if (filter.status) params.append('status', filter.status);
    if (filter.category) params.append('category', filter.category);
    if (filter.tags && filter.tags.length > 0) {
      filter.tags.forEach(tag => params.append('tags', tag));
    }
    if (filter.search) params.append('search', filter.search);
    if (filter.page) params.append('page', filter.page.toString());
    if (filter.pageSize) params.append('pageSize', filter.pageSize.toString());
    return params.toString();
  }
}
