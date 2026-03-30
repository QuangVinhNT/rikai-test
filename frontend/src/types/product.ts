import { Category } from './category';

export interface Product {
    id: number;
    productName: string;
    description: string;
    price: number;
    quantity: number;
    categoryId: number;
    images: string[];
    specifications: Record<string, any>;
    category?: Category;
    createdAt?: string;
    updatedAt?: string;
}
