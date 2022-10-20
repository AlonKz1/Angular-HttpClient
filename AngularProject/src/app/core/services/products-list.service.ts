import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductsListService {
  private productsSubject = new BehaviorSubject<Product[]>([]);

  get products$() {
    return this.productsSubject.asObservable();
  }

  private serverUrl = environment.serverUrl;

  constructor(private httpClient: HttpClient) {}

  async loadProducts(): Promise<Product[] | null> {
    const result = await this.httpClient
      .get<Product[]>(`${this.serverUrl}products`)
      .toPromise();
    if (result) {
      this.productsSubject.next(result);
      return result;
    } else {
      return null;
    }
  }

  async deleteProduct(id: number): Promise<any> {
    const result = await this.httpClient
      .delete<any>(`http://localhost:3000/products/${id}`)
      .toPromise();
    this.loadProducts();
  }

  getProductById(id: number): Observable<Product> {
    const result = this.httpClient.get<Product>(
      `${this.serverUrl}products/${id}`
    );
    return result;
  }

  async UpdateProduct(p: Product): Promise<Product | any> {
    const id = p.id;
    try {
      const result = await this.httpClient
        .put<Product>(`http://localhost:3000/products/${id}`, p)
        .toPromise();
      return result;
    } catch (err) {
      console.log(err);
    } finally {
      this.loadProducts();
    }
  }

  async addNewProduct(p: Product): Promise<any> {
    try {
      const product = await this.httpClient
        .post<Product>(`${this.serverUrl}products`, p)
        .toPromise();
      return product;
    } catch (err) {
      console.log(err);
    } finally {
      this.loadProducts();
    }
  }

  async getProductsByCategory(category: string) {
    const result = await this.httpClient
      .get<Product[]>(`${this.serverUrl}products/category/${category}`)
      .toPromise();
    if (result) {
      this.productsSubject.next(result);
      return result;
    } else {
      return null;
    }
  }
}
