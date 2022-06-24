export type code = number | string; // ej de como crear types propios

export interface INewItem {
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
    code?: code;
}

export interface IItem extends INewItem {
    id: string;
}

export interface INewCart {
    timestamp: string;
    items: any[] | IItem; 
}