import { Injectable } from '@angular/core';
import { Item } from '../Interface/item.interface';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpService) {}

  getAllWeapons() {
    return this.http.get<Item>('weapon/');
  }
}
