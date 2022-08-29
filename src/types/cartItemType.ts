export interface CartItemType {
  id: number;
  imageUrl: string;
  title: string;
  type: 'Thin' | 'Traditional';
  size: number;
  price: number;
  category: number;
  rating: number;
  count: number;
}
