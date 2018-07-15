import { IProduct } from '../interfaces/iproduct';

export class Product implements IProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  rating: number;
}
