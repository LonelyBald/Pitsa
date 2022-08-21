export interface CartItemType {
  id: number;
  imageUrl: string;
  title: string;
  type: 'тонкое' | 'традиционное';
  size: number;
  price: number;
  category: number;
  rating: number;
  count: number;
}
