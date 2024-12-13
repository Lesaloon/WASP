import { Injectable } from '@angular/core';
import { Item, Weapon } from '../Interfaces/item.interface';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpService) {}

  getAllWeapons() {
    return this.http.get<Weapon>('weapon/');
  }

  createWeapon(weapon: Weapon) {
	return this.http.post<Weapon>('weapon/', weapon);
  }

  updateWeapon(weapon: Weapon) {
	return this.http.put<Weapon>(`weapon/${weapon.id}`, weapon);
  }

  deleteWeapon(weapon: Weapon) {
	return this.http.delete<Weapon>(`weapon/${weapon.id}`);
  }
}
