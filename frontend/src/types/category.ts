export interface Category {
  id: number;
  categoryName: string;
  specificationsKey: string[];
  _count?: {
    products: number
  }
}
