export class CreateProductDto {
  productName: string;
  description: string;
  price: number;
  categoryId: number;
  images: string[];
  specifications: Record<string, any>;
}
