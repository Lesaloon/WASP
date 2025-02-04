import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ApiResponse } from '../interfaces/api-responce.interface';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {}

  static URL = 'http://localhost:3000/api/';

  get<T>(url: string): Observable<T | T[]> {
    return this.http.get(HttpService.URL + url).pipe(
      map((response: Object) => {
        const apiResponse = response as ApiResponse<T>;
        if (apiResponse.success) {
          return apiResponse.payload;
        } else {
          return this.handleError(response)
        }
      })
    );
  }

  post<T>(url: string, data: any): Observable<T | T[]> {
    return this.http.post(HttpService.URL + url, data).pipe(
      map((response: Object) => {
        const apiResponse = response as ApiResponse<T>;
        if (apiResponse.success) {
          return apiResponse.payload;
        } else {
          return this.handleError(response)
        }
      })
    );
  }

  put<T>(url: string, data: any): Observable<T | T[]> {
    return this.http.put(HttpService.URL + url, data).pipe(
      map((response: Object) => {
        const apiResponse = response as ApiResponse<T>;
        if (apiResponse.success) {
          return apiResponse.payload;
        } else {
          return this.handleError(response)
        }
      })
    );
  }

  delete<T>(url: string): Observable<T | T[]> {
    return this.http.delete(HttpService.URL + url).pipe(
      map((response: Object) => {
        const apiResponse = response as ApiResponse<T>;
        if (apiResponse.success) {
          return apiResponse.payload;
        } else {
          return this.handleError(response)
        }
      })
    );
  }

  handleError(error: any) {
    console.error(error.message);
    console.error(error.errors);
    if (error.payload.message== "Invalid Token") {
      console.error("Redirect to login");
    }
    return [];
  }
}
