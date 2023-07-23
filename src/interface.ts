export interface SentimentResponse {
  /** The sentiment of the text. */
  sentiment: 'negative' | 'neutral' | 'positive';
}

export interface Product {
  price: number;
  name: string;
  count: number;
  category: 'food' | 'drink' | 'snack' | 'other';
}

export interface Products {
  products: Product[];
}
