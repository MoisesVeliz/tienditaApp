import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  listItem: { name: string; iconName: string; route: string }[] = [
    {
      name: 'Lista de precios',
      iconName: 'pi pi-home',
      route: '/home'
    },
    {
      name: 'Inventario',
      iconName: 'pi pi-list',
      route: '/inventory'
    },
    {
      name: 'Caja',
      iconName: 'pi pi-shopping-cart',
      route: '/shopping-cart'
    },
  ];
  activeItem = 0;

  constructor() { }

  ngOnInit(): void {
  }

}
