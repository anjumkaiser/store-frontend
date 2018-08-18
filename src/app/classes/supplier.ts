import { ISupplier } from '../interfaces/isupplier';

export class Supplier implements ISupplier {
  constructor(
    public id: number,
    public name: string,
    public address: string,
    public city: number,
    public phone: string,
    public principal_contact: string
  ) { }
}
