import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Product } from '../models/product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private httpClient: HttpClient) { }

  productsUrl = environment.apiUrl + '/products/';

  GetAll(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(this.productsUrl);
  }
  
  Get(id: number): Observable<Product> {
    return this.httpClient.get<Product>(this.productsUrl + id);
  }

  Add(product: Product): Observable<number> {
    return this.httpClient.post<number>(this.productsUrl, product);
  }

  Delete(id: number): Observable<number> {
    return this.httpClient.delete<number>(this.productsUrl + id);
  }
}
