export type code = number | string; 

export interface IItem {
    name: string;
    description: string;
    price: number;
    image: string;
    stock: number;
    timestamp: string;
}

export interface IUpdateItem {
    name?: string;
    description?: string;
    price?: number;
    image?: string;
    stock?: number;
    timestamp?: string;
}

export interface INewCart {
    timestamp: string;
    items: any[] | IItem; 
}