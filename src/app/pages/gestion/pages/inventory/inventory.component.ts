import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {
  selectedCity1: any;
  countries = [
    {
      cname: 'Und'
    },
    {
      name: 'Kg',
      code: 'kg',
      unidades: [
        {
          cname: 'kg',
        },
        {
          cname: 'g',
        },
        {
          cname: 'mg',
        },

      ]
    },
    {
      name: 'L',
      code: 'l',
      unidades: [
        {
          cname: 'L',
        },
        {
          cname: 'ml',
        }

      ]
    },
    {
      cname: 'Oz',
      code: 'oz',
    },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
