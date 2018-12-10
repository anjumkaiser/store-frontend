import { ICountry } from '../interfaces/icountry';

export class Country implements ICountry {
    constructor(
        public id: string,
        public code: string,
        public name: string,
    ) { }
}
