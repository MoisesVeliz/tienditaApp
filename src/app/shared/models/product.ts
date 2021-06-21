export interface Product {
  id?: string;
  code?: string;
  name?: string;
  description?: string;
  price?: number;
  quantity?: number;
  inventoryStatus?: string;
  category?: string;
  image?: string;
  rating?: number;
  precioUnidadBolivar?: number;
  precioUnidadDolar?: number;
  tasaCambio?: number;
  selectedCurrency?: string | null;
}
