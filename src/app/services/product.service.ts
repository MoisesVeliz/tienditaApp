import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../shared/models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient, private firestore: AngularFirestore) { }

  // getProductsSmall() {
  //   return this.http.get<any>('assets/products-small.json')
  //     .toPromise()
  //     .then((res: { data: Product[]; }) => <Product[]>res.data)
  //     .then((data: any) => { return data; });
  // }

  // // ******************Start*************************
  async getProducts(): Promise<Product[]> {
    const res = await this.http.get<any>('assets/products.json').toPromise();
    const data = res.data;
    return data;
  }
  // // ******************End*************************
  // getProducts(): Observable<any> {
  //   const dataCollection: any = this.firestore.collection('products');
  //   return dataCollection.snapshotChanges().pipe(
  //     map((actions: any) => actions.map((a: any) => {
  //       const data = { payload: a.payload.doc.data() };
  //       const id = a.payload.doc.id;
  //       return { id, ...data };
  //     }))
  //   );

  // }

  addProduct(product: Product): Promise<any> {
    return this.firestore.collection('productList').doc("123").set(product);
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
