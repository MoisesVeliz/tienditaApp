import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/pages/login/login.component';
import { RegistroComponent } from './pages/auth/pages/registro/registro.component';
import { GestionComponent } from './pages/gestion/gestion.component';
import { HomeComponent } from './pages/gestion/pages/home/home.component';
import { InventoryComponent } from './pages/gestion/pages/inventory/inventory.component';
import { ShoppingCartComponent } from './pages/gestion/pages/shopping-cart/shopping-cart.component';
import { WelcomeComponent } from './pages/gestion/pages/welcome/welcome.component';
import { PagenofoundComponent } from './pages/pagenofound/pagenofound.component';


const routes: Routes = [
  {
    path: '', component: GestionComponent, children: [
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
