export class UpdateProductDto {
  productName?: string;
  description?: string;
  price?: number;
  quantity?: number;
  categoryId?: number;
  images?: string[];
  specifications?: Record<string, any>;
}
