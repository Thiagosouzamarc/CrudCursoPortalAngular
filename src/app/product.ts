import { Departament } from './departament';

export interface Product {
    name: string;
    departaments: Departament[];
    stock: number;
    price: number;
    _id?: string
}
