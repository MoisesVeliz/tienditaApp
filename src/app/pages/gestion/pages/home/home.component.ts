import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { ProductService } from 'src/app/shared/services/product.service';
import { Product } from 'src/app/shared/models/product';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class HomeComponent implements OnInit {

  tasaCambio = 0;
  currencySymbol: CurrencySymbol = {
    BS: 'Bs.S',
    USD: '$'
  }
  productDialog: boolean = false;
  products: Product[] = [];
  product: Product = {
    id: '',
    name: '',
    precioUnidadBolivar: 0,
    precioUnidadDolar: 0,
    tasaCambio: this.tasaCambio,
    selectedCurrency: null,
  };
  selectedProducts: Product[] = [];
  submitted: boolean = false;
  statuses: any[] = [];
  editing: boolean = false
  clonedProducts: { [s: string]: Product; } = {};

  showConfirmPopUp = false;
  productSelected: Product | null = null;
  newProduct: Product | null = null;
  productUlrimate: Product | null = null;

  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.getMonetaryRate();
    this.getProducts();
    // this.testSetAmount();
    // this.testUpdateTasa(2900000);
    // this.testCrud();

    // this.getProduct();
  }

  // ?=================== Start monetary rate ===================
  getMonetaryRate(): void {
    this.productService.getMonetaryRate().subscribe(res => {
      if (res) {
        console.log(res);
        this.tasaCambio = res.rate;
      } else {
        console.log('sin registro');
      }
    },
      error => this.messageService.add({ severity: 'error', summary: 'Error de servicio', detail: 'Tasa del dia no obtenida', life: 3000 })
    );
  }

  updateTasaCambio(): void {
    if (this.tasaCambio <= 0) {
      console.log('Alerta! tasa de cambio esta en 0, esto borrará los montos en bolivares');
    }
    this.productService.updateMonetaryRate(this.tasaCambio).subscribe(res => {
      console.log(res);
      this.products.forEach((product) => {
        const precioDolar = product.precioUnidadDolar ? product.precioUnidadDolar : 0;
        product.tasaCambio = this.tasaCambio;
        product.precioUnidadBolivar = Number((precioDolar * product.tasaCambio).toFixed(2));
      });

      this.productService.updateProductList(this.products).subscribe(res => {
        this.messageService.add({ severity: 'success', summary: 'Excito!', detail: 'Lista de productos actualizada', life: 3000 });
      }, error => {
        this.messageService.add({ severity: 'error', summary: 'Error de servicio', detail: 'Lista de productos no actualizada', life: 3000 });
      });
      this.messageService.add({ severity: 'success', summary: 'Excito!', detail: 'Tasa actualizada', life: 3000 });
    }, error => {
      this.messageService.add({ severity: 'error', summary: 'Error de servicio', detail: 'Tasa no actualizada', life: 3000 });
    });
  }
  // ?=================== End monetary rate ===================

  // ?=================== Start CRUD product ===================
  addProduct(): void {
    const newProducto: Product = {
      id: '0005',
      name: 'galletas',
      precioUnidadBolivar: 0,
      precioUnidadDolar: 0,
      tasaCambio: this.tasaCambio,
      selectedCurrency: null,
    };

    this.productService.addProduct(newProducto).subscribe((res: { name: string }) => {
      newProducto.uriId = res.name;
      this.products.push(newProducto);
      this.productUlrimate = newProducto;
      setTimeout(() => this.productUlrimate = null, 800);
      this.messageService.add({ severity: 'success', summary: 'Excito!', detail: 'Producto Agregado', life: 3000 });
    }, error => {
      this.messageService.add({ severity: 'error', summary: 'Error de servicio', detail: 'Producto no creado', life: 3000 });
    });
  }

  getProducts(): void {
    this.productService.getProducts()
      .subscribe(
        res => this.products = res,
        error => this.messageService.add({ severity: 'error', summary: 'Error de servicio', detail: 'Productos no obtenidos', life: 3000 })
      );
  }

  saveProduct() {
    this.submitted = true;

    if (this.product.name?.trim()) {
      if (this.product.id) {
        this.products[this.findIndexById(this.product.id)] = this.product;
        this.messageService.add({ severity: 'success', summary: 'Excito!', detail: 'Product Updated', life: 3000 });
      }
      else {
        this.product.id = this.createId();
        this.product.tasaCambio = this.tasaCambio;
        this.productService.addProduct(this.product).subscribe((res: { name: string }) => {
          this.product.uriId = res.name;
          this.products.push(this.product);
          this.productUlrimate = this.product;
          setTimeout(() => this.productUlrimate = null, 800);
          this.product = {};
          this.messageService.add({ severity: 'success', summary: 'Excito!', detail: 'Producto Agregado', life: 3000 });
        }, error => {
          this.messageService.add({ severity: 'error', summary: 'Error de servicio', detail: 'Producto no creado', life: 3000 });
        });
      }

      // this.products = [...this.products];
      this.productDialog = false;

    }
  }

  deleteProduct() {
    console.log(this.productSelected);
    const haveUri = this.productSelected ? this.productSelected.uriId : null;
    if (this.productSelected && haveUri) {
      this.productService.deleteProduct(this.productSelected).subscribe(res => {
        console.log(res);
        this.messageService.add({ severity: 'success', summary: 'Excito!', detail: 'Producto eliminado', life: 3000 });
        this.showConfirmPopUp = !this.showConfirmPopUp;
        this.products.splice(this.products.findIndex(e => e.uriId === this.productSelected?.uriId), 1);
        this.productSelected = null;
      }, error => {
        this.messageService.add({ severity: 'error', summary: 'Error de servicio', detail: 'Producto no eliminado', life: 3000 });
        this.showConfirmPopUp = !this.showConfirmPopUp;
      });
    } else {
      this.messageService.add({ severity: 'error', summary: 'Error cliente', detail: 'Producto no eliminado', life: 3000 });
      this.showConfirmPopUp = !this.showConfirmPopUp;
    }
  }

  onRowEditSave(product: Product, idx: number) {
    if (product.precioUnidadBolivar && product.precioUnidadDolar && product.id) {
      this.productService.updateProduct(product).subscribe(res => {
        console.log(res);
        if (product.precioUnidadBolivar && product.precioUnidadDolar && product.id) {
          delete this.clonedProducts[product.id];
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Product is updated' });
        }
        else {
          this.messageService.add({ severity: 'error', summary: 'Errord el cliente', detail: 'Producto no actualizado' });
        }
      }, error => {
        this.messageService.add({ severity: 'error', summary: 'Error del servicio', detail: 'Producto no actualizado' });
        this.onRowEditCancel(product, idx);
      });
    }
  }


  // ?=================== End CRUD product ===================


  onRowEditInit(product: Product) {
    if (product.id) {
      this.clonedProducts[product.id] = { ...product };
    }
  }

  onRowEditCancel(product: Product, index: number) {
    if (product.id) {
      this.products[index] = this.clonedProducts[product.id];
      delete this.clonedProducts[product.id];
    }
  }

  confirmPopUp(product: Product) {
    this.productSelected = product;
    this.showConfirmPopUp = !this.showConfirmPopUp;
  }

  openModalProduct(): void {
    this.productDialog = !this.productDialog;
  }


  setAmount(amount: number | undefined, currencySymbol: string, idx?: number): void {
    try {
      if (typeof amount !== 'number') {
        amount = 0;
      }


      if (idx !== undefined) {
        const tasa: number = Number(this.products[idx].tasaCambio);
        if (currencySymbol === this.currencySymbol.BS) {
          // calcular monto en dolares
          this.products[idx].precioUnidadDolar = Number((amount / tasa).toFixed(2));
        } else if (currencySymbol === this.currencySymbol.USD) {
          // Calcular monto en bolivares
          this.products[idx].precioUnidadBolivar = Number((amount * tasa).toFixed(2));
        }
        return;
      } else {
        if (currencySymbol === this.currencySymbol.BS) {
          // calcular monto en dolares
          this.product.precioUnidadDolar = Number((amount / this.tasaCambio).toFixed(2));
        } else if (currencySymbol === this.currencySymbol.USD) {
          // Calcular monto en bolivares
          this.product.precioUnidadBolivar = Number((amount * this.tasaCambio).toFixed(2));
        }
        return;
      }
    } catch (error) {
      console.log(error);

      this.messageService.add({ severity: 'error', summary: 'Error de cliente', detail: 'No se puede asignar precio', life: 3000 });
    }

  }

  // openNew() {
  //   this.product = {};
  //   this.submitted = false;
  //   this.productDialog = true;
  // }

  // deleteSelectedProducts() {
  //   this.confirmationService.confirm({
  //     message: 'Are you sure you want to delete the selected products?',
  //     header: 'Confirm',
  //     icon: 'pi pi-exclamation-triangle',
  //     accept: () => {
  //       this.products = this.products.filter(val => !this.selectedProducts.includes(val));
  //       // this.selectedProducts = null;
  //       this.messageService.add({ severity: 'success', summary: 'Excito!', detail: 'Products Deleted', life: 3000 });
  //     }
  //   });
  // }

  editProduct(product: Product$) {
    this.product = { ...product };
    this.productDialog = true;
  }

  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
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
