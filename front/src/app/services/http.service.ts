import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ApiResponse } from '../Interface/api-responce.interface';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {}

  static URL = 'http://localhost:3000/api/';

  get<T>(url: string): Observable<T[]> {
    return this.http.get(HttpService.URL + url).pipe(
      map((response: Object) => {
        const apiResponse = response as ApiResponse<T>;
        if (apiResponse.success) {
          return apiResponse.payload;
        } else {
          console.error(apiResponse.message);
          console.error(apiResponse.errors);
          return [];
        }
      })
    );
  }

  post<T>(url: string, data: any): Observable<T[]> {
    return this.http.post(HttpService.URL + url, data).pipe(
      map((response: Object) => {
        const apiResponse = response as ApiResponse<T>;
        if (apiResponse.success) {
          return apiResponse.payload;
        } else {
          console.error(apiResponse.message);
          console.error(apiResponse.errors);
          return [];
        }
      })
    );
  }

  put<T>(url: string, data: any): Observable<T[]> {
    return this.http.put(HttpService.URL + url, data).pipe(
      map((response: Object) => {
        const apiResponse = response as ApiResponse<T>;
        if (apiResponse.success) {
          return apiResponse.payload;
        } else {
          console.error(apiResponse.message);
          console.error(apiResponse.errors);
          return [];
        }
      })
    );
  }

  delete<T>(url: string): Observable<T[]> {
    return this.http.delete(HttpService.URL + url).pipe(
      map((response: Object) => {
        const apiResponse = response as ApiResponse<T>;
        if (apiResponse.success) {
          return apiResponse.payload;
        } else {
          console.error(apiResponse.message);
          console.error(apiResponse.errors);
          return [];
        }
      })
    );
  }
}
