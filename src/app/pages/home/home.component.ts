import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/shared/models/product';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class HomeComponent implements OnInit {
  tasaCambio = 3083000;
  currencySymbol: CurrencySymbol = {
    BS: 'Bs.S',
    USD: '$'
  }
  productDialog: boolean = false;
  products: Product[] = [];
  product: Product = {};
  selectedProducts: Product[] = [];
  submitted: boolean = false;
  statuses: any[] = [];
  editing: boolean = false
  products2: Product[] = [];
  clonedProducts: { [s: string]: Product; } = {};

  constructor(private messageService: MessageService, private confirmationService: ConfirmationService, private productService: ProductService) { }

  ngOnInit(): void {
    // this.testSetAmount();
    // this.testUpdateTasa(2900000);
    // this.testCrud();



    this.statuses = [
      { label: 'INSTOCK', value: 'instock' },
      { label: 'LOWSTOCK', value: 'lowstock' },
      { label: 'OUTOFSTOCK', value: 'outofstock' }
    ];
    this.addProduct();
    // this.getProduct();
  }

  updateTasaCambio(): void {
    if (this.tasaCambio <= 0) {
      console.log('Alerta! tasa de cambio esta en 0, esto borrará los montos en bolivares');
    }
    this.products.forEach((product) => {
      const precioDolar = product.precioUnidadDolar ? product.precioUnidadDolar : 0;
      product.tasaCambio = this.tasaCambio;
      product.precioUnidadBolivar = Number((precioDolar * product.tasaCambio).toFixed(2));
    });
  }

  addProduct(): void {
    const newProducto: Product = {
      id: '0005',
      name: 'galletas',
      precioUnidadBolivar: 0,
      precioUnidadDolar: 0,
      tasaCambio: this.tasaCambio,
      selectedCurrency: null,
    };
    // this.inventario.push(newProducto);
    this.productService
      .addProduct(newProducto)
      .then(res => console.log(res))
      .catch(error => console.error(error));
  }

  // deleteProduct(idx: number): void {
  //   this.inventario.splice(idx, 1);
  // }

  // updateProduct(idx: number): void {
  //   this.inventario[idx].name = '***Producto editado***';
  //   this.inventario[idx].precioUnidadBolivar = this.inventario[idx].precioUnidadBolivar;
  //   this.inventario[idx].precioUnidadDolar = this.inventario[idx].precioUnidadDolar;
  //   this.inventario[idx].tasaCambio = this.inventario[idx].tasaCambio;
  //   this.inventario[idx].selectedCurrency = this.inventario[idx].selectedCurrency;
  // }

  setAmount(amount: number, currencySymbol: string, idx: number): void {
    const tasa: number = Number(this.products[idx].tasaCambio);
    if (currencySymbol === this.currencySymbol.BS) {
      // calcular monto en dolares
      this.products[idx].precioUnidadDolar = Number((amount / tasa).toFixed(2));
    } else if (currencySymbol === this.currencySymbol.USD) {
      // Calcular monto en bolivares
      this.products[idx].precioUnidadBolivar = Number((amount * tasa).toFixed(2));
    }
  }


  getProduct(): void {
    this.productService.getProducts().then((res: any) => this.products = res)
  }

  openNew() {
    this.product = {};
    this.submitted = false;
    this.productDialog = true;
  }

  deleteSelectedProducts() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected products?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.products = this.products.filter(val => !this.selectedProducts.includes(val));
        // this.selectedProducts = null;
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
      }
    });
  }

  editProduct(product: Product$) {
    this.product = { ...product };
    this.productDialog = true;
  }

  deleteProduct(product: Product) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + product.name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.products = this.products.filter(val => val.id !== product.id);
        this.product = {};
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
      }
    });
  }

  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
  }

  saveProduct() {
    this.submitted = true;

    if (this.product.name?.trim()) {
      if (this.product.id) {
        this.products[this.findIndexById(this.product.id)] = this.product;
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
      }
      else {
        this.product.id = this.createId();
        this.product.image = 'product-placeholder.svg';
        this.products.push(this.product);
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
      }

      this.products = [...this.products];
      this.productDialog = false;
      this.product = {};
    }
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.products.length; i++) {
      if (this.products[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  }

  createId(): string {
    let id = '';
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }

  onRowEditInit(product: Product) {
    this.clonedProducts[0] = { ...product };
  }

  onRowEditSave(product: Product) {
    if (100 > 0) {
      delete this.clonedProducts[0];
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Product is updated' });
    }
    else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Invalid Price' });
    }
  }

  onRowEditCancel(product: Product, index: number) {
    this.products2[index] = this.clonedProducts[0];
    delete this.clonedProducts[0];
  }

  // testUpdateTasa(amount: number): void {
  //   // test 1.

  //   console.log('2 ***Ingresar tasa***');
  //   this.tasaCambio = amount;
  //   console.log('3 ***Actualizar tasa***');
  //   this.updateTasaCambio();
  //   console.log('4 ***Mostrar tabla***');
  //   console.log(this.inventario);
  //   console.log('******');
  // }

  // testSetAmount(): void {
  //   console.log('1 ***Ingresar monto***');
  //   this.inventario.forEach((product: Product, idx: number) => {
  //     const random = Math.floor(Math.random() * (2 - 0)) + 0;
  //     const amount = Math.floor(Math.random() * (4000000 - 1000000)) + 1000000;
  //     let currency: string = '';

  //     switch (random) {
  //       case 0: {
  //         currency = this.currencySymbol.BS
  //         this.inventario[idx].selectedCurrency = currency;
  //         this.inventario[idx].precioUnidadBolivar = Number(amount.toFixed(2));
  //         this.setAmount(amount, currency, idx);
  //         break;
  //       }
  //       case 1: {
  //         currency = this.currencySymbol.USD
  //         this.inventario[idx].selectedCurrency = currency;
  //         this.inventario[idx].precioUnidadDolar = Number((amount / this.inventario[idx].tasaCambio).toFixed(2));
  //         this.setAmount(this.inventario[idx].precioUnidadDolar, currency, idx);
  //         break;
  //       }
  //       default: {
  //         console.log('No ingresado!');
  //       }
  //     }

  //   });
  //   console.log('2 ***Mostrar tabla***');
  //   console.log(JSON.parse(JSON.stringify(this.inventario)));
  // }

  // testCrud(): void {
  //   const conteoInicial = this.inventario.length;

  //   this.deleteProduct(2);
  //   if (this.inventario.length === (conteoInicial - 1)) {
  //     console.log('delete OK');
  //   } else {
  //     console.error('delete error');
  //   }
  //   const conteoDelete = this.inventario.length;

  //   this.addProduct();
  //   this.addProduct();
  //   this.addProduct();
  //   if (conteoDelete + 3) {
  //     console.log('add ok');
  //   } else {
  //     console.error('add error');
  //   }
  //   const conteoAdd = this.inventario.length;

  //   try {
  //     this.updateProduct(0);
  //     this.updateProduct(4);
  //     console.log('Update ok');
  //   } catch (error) {
  //     console.error('update erro');
  //   }

  //   console.log('****Mostrar tabla****');
  //   console.log(JSON.parse(JSON.stringify(this.inventario)));
  // }

}

interface Product$ {
  id: string;
  name: string;
  precioUnidadBolivar: number,
  precioUnidadDolar: number,
  tasaCambio: number;
  selectedCurrency: string | null;
}

interface CurrencySymbol {
  BS: string;
  USD: string;
}
