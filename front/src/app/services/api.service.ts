import { Injectable } from '@angular/core';
import { Item, Weapon } from '../interfaces/item.interface';
import { HttpService } from './http.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpService) {}

  getAllWeapons():Observable<Weapon[]> {
    return this.http.get<Weapon[]>('weapon/') as Observable<Weapon[]>;
  }

  createWeapon(weapon: Weapon):Observable<Weapon> {
	return this.http.post<Weapon>('weapon/', weapon) as Observable<Weapon>;
  }

  updateWeapon(weapon: Weapon):Observable<Weapon> {
	return this.http.put<Weapon>(`weapon/${weapon.id}`, weapon) as Observable<Weapon>;
  }

  deleteWeapon(weapon: Weapon):Observable<Weapon> {
	return this.http.delete<Weapon>(`weapon/${weapon.id}`) as Observable<Weapon>;
  }
}
