import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
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
    private firestore: AngularFirestore,
    private lStorage: LocalStorageService
  ) { }

  // // ******************Start*************************


  getMonetaryRate(): Observable<any> {
    // api/monetaryRate/[idUser]
    // return this.http.get<any[]>(`${this.dbUrl}/monetaryRate/${this.lStorage.getUser().userId}.json?auth=${this.lStorage.getUser().token}`);
    return this.http.get<any[]>(`${this.dbUrl}/monetaryRate/${this.lStorage.getUser().userId}.json`);
  }

  updateMonetaryRate(rate: number): Observable<{ rate: number }> {
    // api/monetaryRate/[idUser]
    return this.http.put<{ rate: number }>(`${this.dbUrl}/monetaryRate/${this.lStorage.getUser().userId}.json`, { rate: rate });
  }
  // // ******************End*************************
  getProducts(): Observable<Product[]> {
    // api/productList/[idUser]
    // return this.http.get<any[]>(`${this.dbUrl}/productList/${this.lStorage.getUser().userId}.json?auth=${this.lStorage.getUser().token}`).pipe(
    return this.http.get<any[]>(`${this.dbUrl}/productList/${this.lStorage.getUser().userId}.json`).pipe(
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
    return this.http.post(`${this.dbUrl}/productList/${this.lStorage.getUser().userId}.json`, product);
  }

  deleteProduct(product: Product): Observable<any> {
    return this.http.delete(`${this.dbUrl}/productList/${this.lStorage.getUser().userId}/${product.uriId}.json`);
  }

  updateProduct(product: Product): Observable<any> {
    return this.http.put<{ rate: number }>(`${this.dbUrl}/productList/${this.lStorage.getUser().userId}/${product.uriId}.json`, product);
  }

  updateProductList(productList: Product[]): Observable<any> {
    const productListUpdate: { [s: string]: any } = {};
    productList.forEach((e: Product) => {
      if (e.uriId) {
        productListUpdate[e.uriId] = e;
      }
    });
    return this.http.put<{ rate: number }>(`${this.dbUrl}/productList/${this.lStorage.getUser().userId}.json`, productListUpdate);
  }
  // getProductsWithOrdersSmall() {
  //   return this.http.get<any>('assets/products-orders-small.json')
  //     .toPromise()
  //     .then((res: { data: Product[]; }) => <Product[]>res.data)
  //     .then((data: any) => { return data; });
  // }

  // generatePrduct(): Product {
  //   const product: Product = {
  //     id: this.generateId(),
  //     name: this.generateName(),
  //     description: "Product Description",
  //     price: this.generatePrice(),
  //     quantity: this.generateQuantity(),
  //     category: "Product Category",
  //     inventoryStatus: this.generateStatus(),
  //     rating: this.generateRating()
  //   };

  //   product.image = product.name?.toLocaleLowerCase().split(/[ ,]+/).join('-') + ".jpg";;
  //   return product;
  // }

  // generateId() {
  //   let text = "";
  //   let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  //   for (var i = 0; i < 5; i++) {
  //     text += possible.charAt(Math.floor(Math.random() * possible.length));
  //   }

  //   return text;
  // }

  // generateName() {
  //   return this.productNames[Math.floor(Math.random() * Math.floor(30))];
  // }

  // generatePrice() {
  //   return Math.floor(Math.random() * Math.floor(299) + 1);
  // }

  // generateQuantity() {
  //   return Math.floor(Math.random() * Math.floor(75) + 1);
  // }

  // generateStatus() {
  //   return this.status[Math.floor(Math.random() * Math.floor(3))];
  // }

  // generateRating() {
  //   return Math.floor(Math.random() * Math.floor(5) + 1);
  // }
}
