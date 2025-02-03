export interface Product {
  price: number;
  name: string;
  count: number;
  category: 'food' | 'drink' | 'snack' | 'other';
}

export interface Products {
  products: Product[];
}
