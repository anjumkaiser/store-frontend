import { IProduct } from '../interfaces/iproduct';

export class Product implements IProduct {
  constructor(
    public id: number,
    public name: string,
    public description: string,
    public price: number,
    public rating: number) {
  }
}
