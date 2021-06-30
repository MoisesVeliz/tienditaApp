import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Product } from '../shared/models/product';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  dbUrl: string = environment.firebaseConfig.databaseURL;

  constructor(
    private http: HttpClient,
    private lStorage: LocalStorageService
  ) { }

  // // ******************Start*************************

  getMonetaryRate(): Observable<any> {
    // api/monetaryRate/[idUser]
    // return this.http.get<any[]>(`${this.dbUrl}/monetaryRate/${this.lStorage.getUser().userId}.json?auth=${this.lStorage.getUser().token}`);
    return this.http.get<any[]>(`${this.dbUrl}/monetaryRate/${this.lStorage.getUser(this.lStorage.SIN_IN_DATA).userId}.json`);
  }

  updateMonetaryRate(rate: number): Observable<{ rate: number }> {
    // api/monetaryRate/[idUser]
    return this.http.put<{ rate: number }>(`${this.dbUrl}/monetaryRate/${this.lStorage.getUser(this.lStorage.SIN_IN_DATA).userId}.json`, { rate: rate });
  }
  // // ******************End*************************
  getProducts(): Observable<Product[]> {
    // api/productList/[idUser]
    // return this.http.get<any[]>(`${this.dbUrl}/productList/${this.lStorage.getUser().userId}.json?auth=${this.lStorage.getUser().token}`).pipe(
    return this.http.get<any[]>(`${this.dbUrl}/productList/${this.lStorage.getUser(this.lStorage.SIN_IN_DATA).userId}.json`).pipe(
      map(x => {
        if (x) {
          // return Object.values(x);
          const keys: string[] = Object.keys(x);
          const values: Product[] = Object.values(x);
          if (keys.length === values.length) {
            values.forEach((e: Product, idx: number) => e.uriId = keys[idx]);
            return values;
          } else {
            console.log('Error al armar el objeto lista de productos');
            return [];
          }
        } else {
          return [];
        }
      })
    );
  }

  addProduct(product: Product): Observable<any> {
    // api/productList/[idUser]
    return this.http.post(`${this.dbUrl}/productList/${this.lStorage.getUser(this.lStorage.SIN_IN_DATA).userId}.json`, product);
  }

  deleteProduct(product: Product): Observable<any> {
    return this.http.delete(`${this.dbUrl}/productList/${this.lStorage.getUser(this.lStorage.SIN_IN_DATA).userId}/${product.uriId}.json`);
  }

  updateProduct(product: Product): Observable<any> {
    return this.http.put<{ rate: number }>(`${this.dbUrl}/productList/${this.lStorage.getUser(this.lStorage.SIN_IN_DATA).userId}/${product.uriId}.json`, product);
  }

  updateProductList(productList: Product[]): Observable<any> {
    const productListUpdate: { [s: string]: any } = {};
    productList.forEach((e: Product) => {
      if (e.uriId) {
        productListUpdate[e.uriId] = e;
      }
    });
    return this.http.put<{ rate: number }>(`${this.dbUrl}/productList/${this.lStorage.getUser(this.lStorage.SIN_IN_DATA).userId}.json`, productListUpdate);
  }
}
