import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAnalyticsModule } from '@angular/fire/analytics';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';

import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { FileUploadModule } from 'primeng/fileupload';
import { HttpClientModule } from '@angular/common/http';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CalendarModule } from 'primeng/calendar';
import { SliderModule } from 'primeng/slider';
import { MultiSelectModule } from 'primeng/multiselect';
import { ContextMenuModule } from 'primeng/contextmenu';
import { DropdownModule } from 'primeng/dropdown';
import { ProgressBarModule } from 'primeng/progressbar';
import { InputTextModule } from 'primeng/inputtext';
import { RatingModule } from 'primeng/rating';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MenubarModule } from 'primeng/menubar';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { PanelMenuModule } from 'primeng/panelmenu';
import { ListboxModule } from 'primeng/listbox';
import { CheckboxModule } from 'primeng/checkbox';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { MatStepperModule } from '@angular/material/stepper';
import { SelectButtonModule } from 'primeng/selectbutton';
import { CascadeSelectModule } from 'primeng/cascadeselect';

import { CurrencyMaskModule } from 'ng2-currency-mask';
import { SidebarModule } from 'ng-sidebar';
import { LoginComponent } from './pages/auth/pages/login/login.component';
import { RegistroComponent } from './pages/auth/pages/registro/registro.component';
import { HomeComponent } from './pages/gestion/pages/home/home.component';
import { PagenofoundComponent } from './pages/pagenofound/pagenofound.component';
import { SidebarComponent } from './pages/gestion/components/sidebar/sidebar.component';
import { InventoryComponent } from './pages/gestion/pages/inventory/inventory.component';
import { ShoppingCartComponent } from './pages/gestion/pages/shopping-cart/shopping-cart.component';
import { GestionComponent } from './pages/gestion/gestion.component';
import { WelcomeComponent } from './pages/gestion/pages/welcome/welcome.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroComponent,
    HomeComponent,
    PagenofoundComponent,
    SidebarComponent,
    WelcomeComponent,
    InventoryComponent,
    ShoppingCartComponent,
    GestionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAnalyticsModule,
    AngularFirestoreModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ButtonModule,
    ToastModule,
    ToolbarModule,
    FileUploadModule,
    HttpClientModule,
    TableModule,
    DialogModule,
    FormsModule,

    CalendarModule,
    SliderModule,
    MultiSelectModule,
    ContextMenuModule,
    DropdownModule,
    InputTextModule,
    ProgressBarModule,
    RatingModule,
    RadioButtonModule,
    InputNumberModule,
    ConfirmDialogModule,
    InputTextareaModule,
    CurrencyMaskModule,
    MenubarModule,
    BreadcrumbModule,
    PanelMenuModule,
    ListboxModule,
    SidebarModule.forRoot(),
    CheckboxModule,
    ConfirmPopupModule,
    MatStepperModule,
    SelectButtonModule,
    CascadeSelectModule,
  ],
  providers: [MessageService, ConfirmationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
