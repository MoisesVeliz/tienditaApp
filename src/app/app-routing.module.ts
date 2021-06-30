import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegistroComponent } from './auth/registro/registro.component';
import { HomeComponent } from './pages/home/home.component';
import { PagenofoundComponent } from './pagenofound/pagenofound.component';
import { PagesComponent } from './pages/pages.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { InventoryComponent } from './pages/inventory/inventory.component';
import { ShoppingCartComponent } from './pages/shopping-cart/shopping-cart.component';

const routes: Routes = [
  {
    path: '', component: PagesComponent, children: [
      { path: 'home', component: HomeComponent },
      { path: 'inventory', component: InventoryComponent },
      { path: 'shopping-cart', component: ShoppingCartComponent },
      { path: '', pathMatch: 'full', redirectTo: '/home' },
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'welcome', component: WelcomeComponent },
  { path: '**', component: PagenofoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
