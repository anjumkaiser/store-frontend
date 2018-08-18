import { IManufacturer } from '../interfaces/imanufacturer';

export class Manufacturer implements IManufacturer {
  constructor(
    public id: number,
    public name: string,
    public address: string,
    public city: number,
    public phone: string,
    public principal_contact: string) {
  }
}
